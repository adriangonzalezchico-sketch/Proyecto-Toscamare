import "../../components/cookiesComp/EstilosCookies.css";
const ManejoCookies = () => {
  return (
    <div className="cookies-block">
      <h2> MANEJO DE COOKIES </h2>

      <p>
        {" "}
        Para permitir, conocer, bloquear o eliminar las cookies instaladas en tu
        equipo puedes hacerlo mediante la configuración de las opciones del
        navegador instalado en su ordenador. Puedes encontrar información sobre
        cómo hacerlo en el caso que uses como navegador:
      </p>
      <ul>
        <li>
          <a
            href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", gap: "8px" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg"
              alt="Firefox"
              width={"24"}
            />{" "}
            FIREFOX{" "}
          </a>
        </li>
        <li>
          <a
            href="http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", gap: "8px" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"
              alt="Chrome"
              width={"24"}
            />{" "}
            CHROME{" "}
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/es-es/windows/administrar-cookies-en-microsoft-edge-ver-permitir-bloquear-eliminar-y-usar-168dab11-0753-043d-7c16-ede5947fc64d"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", gap: "8px" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg"
              alt="Microsoft Edge"
              width={"24"}
            />{" "}
            MICROSOFT EDGE{" "}
          </a>
        </li>
        <li>
          <a
            href=" http://support.apple.com/kb/ph5042"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", gap: "8px" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg"
              alt="Safari"
              width={"24"}
            />{" "}
            SAFARI{" "}
          </a>
        </li>
        <li>
          <a
            href="http://help.opera.com/Windows/11.50/es-ES/cookies.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", gap: "8px" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/49/Opera_2015_icon.svg"
              alt="Opera"
              width={"24"}
            />{" "}
            OPERA{" "}
          </a>
        </li>
      </ul>

      <p>
        {" "}
        LA EMPRESA no se responsabilizará del mal uso que el usuario pueda
        realizar de su web, ni de los virus u otros elementos que pudieran
        existir y causar daños en los sistemas informáticos , en los documentos
        electrónicos o en los ficheros de los usuarios de su web o de la web de
        terceros.
      </p>
    </div>
  );
};
export default ManejoCookies;
