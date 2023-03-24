import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PaymentsPage from '../pages/paymentsPage/PaymentsPage';
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";

test("renders PaymentsPage component", () => {
    render(<BrowserRouter><PaymentsPage /></BrowserRouter>);
  });

test("renders PaymentsSortBy and PaymentsFilterBy components", () => {
    const { getByText } = render(<BrowserRouter><PaymentsPage /></BrowserRouter>);

    expect(getByText("Sort by:")).toBeInTheDocument();
    expect(getByText("Filter by:")).toBeInTheDocument();
});

