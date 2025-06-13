import { Competitor } from "@/lib/types";

export const competitiveAnalysisData: { user: Competitor; competitors: Competitor[] } = {
  user: {
    name: "Tu Marca",
    logoUrl: "/logo.svg", // Placeholder for user's logo
    postImageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=500&q=80",
    stats: [
      { label: "Seguidores", value: "82k", isBetter: false },
      { label: "Tasa de Engagement", value: "3.5%", isBetter: true },
      { label: "Frecuencia de Posteo", value: "3 posts/sem.", isBetter: false },
    ],
  },
  competitors: [
    {
      name: "@rival1",
      logoUrl: "https://i.pravatar.cc/150?u=rival1",
      postImageUrl: "https://images.unsplash.com/photo-1554177255-61502b352de3?w=500&q=80",
      stats: [
        { label: "Seguidores", value: "115k", isBetter: true },
        { label: "Tasa de Engagement", value: "2.1%", isBetter: false },
        { label: "Frecuencia de Posteo", value: "7 posts/sem.", isBetter: true },
      ],
    },
    {
      name: "@competidor_x",
      logoUrl: "https://i.pravatar.cc/150?u=competidor_x",
      postImageUrl: "https://images.unsplash.com/photo-1520607162502-ac42dfa8e1ab?w=500&q=80",
      stats: [
        { label: "Seguidores", value: "75k", isBetter: false },
        { label: "Tasa de Engagement", value: "2.9%", isBetter: false },
        { label: "Frecuencia de Posteo", value: "4 posts/sem.", isBetter: true },
      ],
    },
  ],
}; 