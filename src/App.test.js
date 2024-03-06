import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App';
import Home from './components/Home';

// test('to render text present', () => {
//   render(
//   <Router>
//       <Home />
//   </Router>);
//   const text = screen.getByText(/Welcome Here!/i);
//   expect(text).toBeInTheDocument();
// });

// test('to render text not present', () => {
//   render(
//   <Router>
//       <Home />
//   </Router>);
//   const text2 = screen.getByText(/Welcome Everyone/i);
//   expect(text2).toBeInTheDocument();
// });

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