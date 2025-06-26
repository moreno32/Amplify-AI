import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatCard } from '../StatCard';
import { Users } from 'lucide-react';

describe('StatCard', () => {

  it('debe renderizar el título y el valor correctamente', () => {
    render(<StatCard title="Total de Usuarios" value="1,250" />);

    expect(screen.getByText('Total de Usuarios')).toBeInTheDocument();
    expect(screen.getByText('1,250')).toBeInTheDocument();
  });

  it('debe mostrar el indicador de cambio positivo con el color correcto', () => {
    render(
      <StatCard
        title="Ingresos"
        value="$5,000"
        change="+10%"
        changeType="increase"
      />
    );
    
    const changeIndicator = screen.getByText('+10% vs. período anterior');
    expect(changeIndicator).toBeInTheDocument();
    expect(changeIndicator).toHaveClass('text-green-500');
  });

  it('debe mostrar el indicador de cambio negativo con el color correcto', () => {
    render(
      <StatCard
        title="Costos"
        value="$2,000"
        change="-5%"
        changeType="decrease"
      />
    );
    
    const changeIndicator = screen.getByText('-5% vs. período anterior');
    expect(changeIndicator).toBeInTheDocument();
    expect(changeIndicator).toHaveClass('text-red-500');
  });

  it('no debe mostrar el indicador de cambio si no se proporciona', () => {
    render(<StatCard title="Proyectos" value="32" />);

    const changeIndicator = screen.queryByText(/vs\. período anterior/);
    expect(changeIndicator).not.toBeInTheDocument();
  });

  it('debe renderizar un icono cuando se proporciona', () => {
    render(<StatCard title="Icono" value="Sí" icon={<Users data-testid="user-icon" />} />);
    
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

}); 