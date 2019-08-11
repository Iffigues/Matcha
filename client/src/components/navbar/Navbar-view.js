import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Matcha</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link className="nav-link" to="/suggestions">Suggestions <span class="sr-only">(current)</span></Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/search">Recherche</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/journal">Journal</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/chat">Chat</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/notifications">Notif.</Link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Login
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/profile">Profil</Link>
              <Link className="dropdown-item" to="/account">Compte</Link>
              <div class="dropdown-divider"></div>
              <Link className="dropdown-item" to="/logout">Déconnexion</Link>
            </div>
          </li>

          <li class="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Connexion
            </Link>
            <div class="dropdown-menu dropdown-menu-right">
              <form class="px-4 py-3">
                <div class="form-group">
                  <label class="sr-only">Nom d'utilisateur</label>
                  <input name="username" type="username" class="form-control" placeholder="Nom d'utilisateur" />
                </div>
                <div class="form-group">
                  <label class="sr-only">Mot de Passe</label>
                  <input name="password" type="password" class="form-control" placeholder="Mot de Passe" />
                </div>
                <button id="loginbut" type="button" class="btn btn-primary">Connexion</button>
              </form>
              <div class="dropdown-divider"></div>
              <Link className="dropdown-item" to="/register">Nouveau ici ? Inscription</Link>
              <Link className="dropdown-item" to="/reinitialize">Mot de passe oublié</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
