import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToken } from "../authentication/useToken";
import { useAuth } from "../authentication/useAuth";
import Background from "./Background";

function NotFound() {

  return (
    <main className="not-found-page registerPage">
      <Background/>
        <h1>404</h1>
        <h2>Page Not Found</h2>
      <section className="form">
      </section>
    </main>
  );
}

export default NotFound;
