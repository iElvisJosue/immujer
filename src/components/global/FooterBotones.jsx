/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS A USAR
import "../../styles/components/global/FooterBotones.css";
export default function FooterBotones({
  TextoBotonNegativo = "Cancelar",
  VerBotonNegativo = true,
  FuncionNegativa = () => {},
  TextoBotonPositivo = "Guardar",
}) {
  return (
    <footer className="FooterBotones">
      {VerBotonNegativo && (
        <button
          type="button"
          className="FooterBotones__BotonNegativo"
          onClick={FuncionNegativa}
        >
          {TextoBotonNegativo}
        </button>
      )}
      <button type="submit" className="FooterBotones__BotonPositivo">
        {TextoBotonPositivo}
      </button>
    </footer>
  );
}
