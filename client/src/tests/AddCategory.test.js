import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import { useToken } from '../authentication/useToken';
import AddCategory from '../pages/AddCategory';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');
// jest.mock('../authentication/useToken');

describe('AddCategory component', () => {
    beforeEach(() => {
      render(<BrowserRouter>
          <AddCategory />
          </BrowserRouter>)
    //   useToken.mockReturnValue(['token', jest.fn()]);
    });
  
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    it('renders the input form', () => {
      expect(screen.getByText('Add Category')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Name of the category:')).toBeInTheDocument();
      expect(screen.getByText('Add')).toBeInTheDocument();
    });
  
    it('displays an error message if the category name is not provided', () => {
      const addButton = screen.getByText('Add');
  
      fireEvent.click(addButton);
  
      expect(screen.getByText('Category name is required!')).toBeInTheDocument();
    });
  
    // it('displays an error message if the API call fails', async () => {
    //   const error = new Error('Unable to add category');
    //   axios.post.mockRejectedValueOnce(error); 
  
    //   const input = screen.getByPlaceholderText('Name of the category:');
    //   const addButton = screen.getByText('Add');
  
    //   await act(async () => {
    //     fireEvent.change(input, { target: { value: 'New Category' } });
    //     fireEvent.click(addButton);
    //   });
  
    //   expect(axios.post).toHaveBeenCalledWith(
    //     '/api/category',
    //     { name: 'New Category' },
    //     { headers: { Authorization: 'Bearer token' } }
    //   );
    //   expect(screen.getByText('Unable to add category')).toBeInTheDocument();
    // });
  
    // it('navigates to the categories page if the API call succeeds', async () => {
    //   axios.post.mockResolvedValueOnce({ status: 201 });
  
    //   const input = screen.getByPlaceholderText('Name of the category:');
    //   const addButton = screen.getByText('Add');
  
    //   await act(async () => {
    //     fireEvent.change(input, { target: { value: 'New Category' } });
    //     fireEvent.click(addButton);
    //   });
  
    //   expect(axios.post).toHaveBeenCalledWith(
    //     '/api/category',
    //     { name: 'New Category' },
    //     { headers: { Authorization: 'Bearer token' } }
    //   );
    //   expect(window.location.href).toContain('/categories');
    // });
  });