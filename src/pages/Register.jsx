import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Register.css";

const Register = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    alert("Registo efetuado com sucesso!");
  };

  return (
    <>
      <Header hideRegisterButton={true} />
      <main className="register-page">
        <h2>Registar</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" placeholder="Introduza o seu nome" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Introduza o seu email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="form-group">
            <label>Confirmar Password</label>
            <input type="password" placeholder="Confirme a password" required />
          </div>
          <div className="form-group">
            <label>Género</label>
            <select required>
              <option value="">Selecione o seu género</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data de Nascimento</label>
            <input type="date" required />
          </div>
          <div className="form-group">
            <label>Profissão</label>
            <input type="text" placeholder="Ex: Fisioterapeuta" />
          </div>
          <div className="form-group">
            <label>Nacionalidade</label>
            <input type="text" placeholder="Ex: Portuguesa" />
          </div>

          <div className="clinical-section">
            <h3>Informação Clínica</h3>

            <div className="form-group">
              <label>Problema principal / Historial atual</label>
              <textarea placeholder="Descreva o problema atual ou motivo da consulta" />
            </div>

            <div className="form-group">
              <label>Produtos de apoio (cadeiras de rodas, canadianas, etc.)</label>
              <textarea placeholder="Indique os produtos de apoio utilizados" />
            </div>

            <div className="form-group">
              <label>Antecedentes pessoais</label>
              <textarea placeholder="Ex: hipertensão, diabetes, AVC..." />
            </div>

            <div className="form-group">
              <label>História médica (cirurgias, medicação atual)</label>
              <textarea placeholder="Descreva se toma alguma medicação ou se fez cirurgias" />
            </div>

            <div className="form-group">
              <label>Condições habitacionais (escadas, elevador, etc.)</label>
              <textarea placeholder="Descreva o acesso à habitação" />
            </div>

            <div className="form-group">
              <label>Dificuldades na comunicação</label>
              <select>
                <option value="">Selecionar</option>
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>

            <div className="form-group">
              <label>Autocuidados</label>
              <select>
                <option value="">Selecionar</option>
                <option value="independente">Independente</option>
                <option value="nao independente">Não Independente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Expectativas e objetivos</label>
              <textarea placeholder="O que pretende com a intervenção?" />
            </div>

            <div className="form-group">
              <label>Anexar Exames, Relatórios Clínicos ou Análises</label>
              <div className="file-upload-wrapper enhanced">
                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
              </div>
              <small>Formatos aceites: PDF, imagens ou Word</small>
            </div>
          </div>

          <button type="submit" className="register-button">Registar</button>
        </form>
        <p className="login-link">
          Já tem conta? <a href="/login">Iniciar sessão</a>
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Register;
