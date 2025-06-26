import { createClient } from '@supabase/supabase-js';
import { brandProfileService } from '../lib/services/brandProfileService';
import { postService } from '../lib/services/postService';
import { competitorService } from '../lib/services/competitorService';
import { influencerService } from '../lib/services/influencerService';
import { mockPosts } from '../lib/mock-data/posts';

// This script is designed to be run from the command line.
// It seeds the database with mock data for a specific user.
// Usage: npx tsx scripts/seed.ts <user_email>

// =================================================================
// CONFIGURATION
// =================================================================
// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  process.exit(1);
}

// Create a Supabase client with service_role privileges
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// =================================================================
// HELPER FUNCTIONS
// =================================================================
async function getUserIdByEmail(email: string): Promise<string | null> {
  console.log(`Fetching user ID for email: ${email}...`);
  // Correct method: get all users and find the one with the matching email.
  // This is acceptable for a dev script.
  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error(`Error listing users: ${error.message}`);
    return null;
  }

  const targetUser = users.find(user => user.email === email);

  if (!targetUser) {
    console.error(`No user found with email: ${email}`);
    return null;
  }
  
  console.log(`Found user ID: ${targetUser.id}`);
  return targetUser.id;
}

async function getCompanyIdForUser(userId: string): Promise<string | null> {
  console.log(`Fetching company ID for user: ${userId}...`);
  const { data: memberData, error } = await supabaseAdmin
    .from('company_members')
    .select('company_id')
    .eq('user_id', userId)
    .single();

  if (error || !memberData) {
    console.error(`Error finding company for user ${userId}:`, error?.message);
    return null;
  }
  console.log(`Found company ID: ${memberData.company_id}`);
  return memberData.company_id;
}

// =================================================================
// MAIN SEEDING LOGIC
// =================================================================
async function main() {
  console.log('Starting database seeding script...');

  const userEmail = process.argv[2];
  if (!userEmail) {
    console.error('Usage: npx tsx scripts/seed.ts <user_email>');
    process.exit(1);
  }

  const userId = await getUserIdByEmail(userEmail);
  if (!userId) {
    console.error(`Could not find a user with the email: ${userEmail}. Please ensure the user exists.`);
    process.exit(1);
  }

  const companyId = await getCompanyIdForUser(userId);
  if (!companyId) {
    console.error(`Could not find an associated company for user ID: ${userId}.`);
    process.exit(1);
  }

  const errors: any[] = [];
  let profileSeeded = false;
  let postsSeededCount = 0;
  let competitorsSeededCount = 0;
  let influencersSeededCount = 0;

  try {
    // Note: The services need to be adapted to accept an admin client or be refactored.
    // For now, we are assuming they internally create their own clients.
    // This is a simplification for this script.
    
    // 1. Seed Brand Profile
    // This service might need adjustment to not rely on cookies.
    console.log('Seeding brand profile...');
    const profileSeedResult = await brandProfileService.seedBrandProfile(); // This might fail if it depends on user session
    if (profileSeedResult.success) {
      profileSeeded = true;
      console.log('✅ Brand profile seeded.');
    } else {
      errors.push({ source: 'profile_seeding', error: profileSeedResult.error?.message || 'Failed to seed brand profile.' });
      console.error('❌ Failed to seed brand profile.');
    }

    // 2. Seed Posts
    console.log(`Seeding posts for company ${companyId}...`);
    const postSeedResult = await postService.seedPostsForCompany(companyId, mockPosts);
    postsSeededCount = postSeedResult.seeded;
    if (postSeedResult.errors.length > 0) {
      errors.push({ source: 'post_seeding', details: postSeedResult.errors });
    }
    console.log(`✅ ${postsSeededCount} posts seeded.`);
    
    // 3. Seed Competitors
    console.log('Seeding competitors...');
    const competitorSeedResult = await competitorService.seedCompetitors();
    competitorsSeededCount = competitorSeedResult.seeded;
    if (competitorSeedResult.errors.length > 0) {
      errors.push({ source: 'competitor_seeding', details: competitorSeedResult.errors });
    }
    console.log(`✅ ${competitorsSeededCount} competitors seeded.`);

    // 4. Seed Influencers
    console.log('Seeding influencers...');
    const influencerSeedResult = await influencerService.seedInfluencers();
    influencersSeededCount = influencerSeedResult.seeded;
    if (influencerSeedResult.errors.length > 0) {
      errors.push({ source: 'influencer_seeding', details: influencerSeedResult.errors });
    }
    console.log(`✅ ${influencersSeededCount} influencers seeded.`);

    console.log('\n--- Seeding Summary ---');
    console.log(`- Profile Seeded: ${profileSeeded ? 'Yes' : 'No'}`);
    console.log(`- Posts: ${postsSeededCount}`);
    console.log(`- Competitors: ${competitorsSeededCount}`);
    console.log(`- Influencers: ${influencersSeededCount}`);
    
    if (errors.length > 0) {
      console.error('\n⚠️ Seeding completed with errors:');
      console.error(JSON.stringify(errors, null, 2));
    } else {
      console.log('\n✨ Seeding completed successfully!');
    }

  } catch (error: any) {
    console.error('\n🚨 An unexpected error occurred during seeding:');
    console.error(error);
    process.exit(1);
  }
}

main();