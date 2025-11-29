import React, { useState } from "react";
import "../styles/DocumentacaoSection.css";

const DocumentacaoSection = () => {
  const [documentos, setDocumentos] = useState({
    cedulaProfissional: null,
    identificacao: null,
    certificadoFormacao: null
  });

  const handleDocumentoUpload = (tipo, file) => {
    setDocumentos((prev) => ({
      ...prev,
      [tipo]: file
    }));
  };

  const handleGuardar = () => {
    alert("Documentos guardados com sucesso!");
    // Aqui podes enviar os ficheiros ao backend com FormData se necessário
  };

  return (
    <section className="documentos-section">
      <h3>Documentação Profissional</h3>

      <div className="upload-item">
        <label>Cédula Profissional</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleDocumentoUpload("cedulaProfissional", e.target.files[0])}
        />
        {documentos.cedulaProfissional && (
          <p>📎 {documentos.cedulaProfissional.name}</p>
        )}
      </div>

      <div className="upload-item">
        <label>Identificação (Cartão de Cidadão ou Passaporte)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleDocumentoUpload("identificacao", e.target.files[0])}
        />
        {documentos.identificacao && (
          <p>📎 {documentos.identificacao.name}</p>
        )}
      </div>

      <div className="upload-item">
        <label>Certificado de Formação</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleDocumentoUpload("certificadoFormacao", e.target.files[0])}
        />
        {documentos.certificadoFormacao && (
          <p>📎 {documentos.certificadoFormacao.name}</p>
        )}
      </div>

      <div className="documentos-btn-wrapper">
        <button className="save-docs-btn" onClick={handleGuardar}>Guardar Documentação</button>
      </div>
    </section>
  );
};

export default DocumentacaoSection;

