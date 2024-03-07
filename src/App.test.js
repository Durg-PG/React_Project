import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App';
import Home from './pages/Home';
 
describe("UI test case group",() =>{
 
  test("test case 1",()=>{
    render(
      <Router>
        <Home />
      </Router>
    );
    let inputChek = screen.getAllByRole("textbox");
    expect(inputChek[0]).toHaveAttribute("placeholder","Enter Your Name");
    expect(inputChek[1]).toHaveAttribute("placeholder","Enter email");
  })
})
 
test('to render password field present', () => {
  render(
  <Router>
      <Home />
  </Router>);
  const pass = screen.getByPlaceholderText("pass");
  expect(pass).toBeInTheDocument();
});