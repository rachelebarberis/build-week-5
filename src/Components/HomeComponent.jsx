import { Container } from "react-bootstrap";
const HomeComponent = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center  text-center"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h1 className="mb-3 mt-5">
        Benvenuti nel Gestionale della Clinica Veterinaria
      </h1>
      <p className="text-muted" style={{ maxWidth: "800px" }}>
        Un sistema semplice ed efficace per monitorare farmaci, visite e
        ricoveri degli animali.
      </p>

      <hr className="w-50 my-4" />

      <blockquote className="blockquote text-center">
        <p className="mb-0">
          “Gli animali parlano, ma solo a chi sa ascoltare.”
        </p>
        <footer className="blockquote-footer pt-2">A.D. Williams</footer>
      </blockquote>

      <div className="mt-4">
        <img
          src="/public/images/footer1.jpg"
          alt="Zampa"
          width="300"
          height="120"
        />
      </div>
    </Container>
  );
};
export default HomeComponent;
