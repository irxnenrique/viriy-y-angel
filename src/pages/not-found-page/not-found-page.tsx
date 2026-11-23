import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="not-found">
      <p>Error 404</p>
      <h1>Esta invitación no existe.</h1>
      <Link to="/">
        <ArrowLeft aria-hidden="true" /> Volver a la invitación
      </Link>
    </main>
  );
}
