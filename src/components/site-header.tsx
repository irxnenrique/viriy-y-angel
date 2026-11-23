import { invitation } from "@data/invitation";

export function SiteHeader() {
  return (
    <nav className="site-header" aria-label="Navegación principal">
      <a className="skip-link" href="#details">
        Saltar a los detalles
      </a>
      <a className="monogram" href="#inicio" aria-label="Inicio">
        {invitation.monogram}
      </a>
      <div className="nav-links">
        <a href="#details">La celebración</a>
        <a href="#itinerario">Itinerario</a>
        <a href="#venue">Lugar</a>
        <a href="#rsvp">Confirmar</a>
      </div>
    </nav>
  );
}
