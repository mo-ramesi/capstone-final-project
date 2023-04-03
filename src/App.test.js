import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BookingForm from './Components/BookingForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

test('renders the reservation details heading', () => {
  render(<LocalizationProvider dateAdapter={AdapterDayjs}><BookingForm /></LocalizationProvider>);
  const heading = screen.getByText("Reservation Details");
  expect(heading).toBeInTheDocument();
})

// test('Submit button confirms the booking', () => {
//   render(<LocalizationProvider dateAdapter={AdapterDayjs}><BookingForm /></LocalizationProvider>);
//   const nameINP = screen.getByTestId("fullName")
//   const emailINP = screen.getByTestId("email")
//   const timeButton = screen.getByTestId("time0")
//   const submit = screen.getByText("Confirm Reservation", { selector: 'button' })
//   const confirm = screen.getByText("reservation is confirmed")
//   for (let i=0; 1<19; i++) {
//     userEvent.tab()
//   }
//   fireEvent.keyDown(time, {key: 'arrowup'})
//   fireEvent.click(timeButton)
//   fireEvent.type(nameINP, "User Name")
//   fireEvent.type(emailINP, "email@address.com")
//   fireEvent.click(submit)
//   expect(confirm).toBeInTheDocument();
// })

test("no validation before touched", () => {
  render(<LocalizationProvider dateAdapter={AdapterDayjs}><BookingForm /></LocalizationProvider>);
  const req = screen.queryByText("required");
  const emVal = screen.queryByText("You must enter a valid email address");
  const phVal = screen.queryByText("You must enter a valid phone number");
  expect(req).not.toBeInTheDocument();
  expect(emVal).not.toBeInTheDocument();
  expect(phVal).not.toBeInTheDocument();
})

test("full name validation", async () => {
  render(<LocalizationProvider dateAdapter={AdapterDayjs}><BookingForm /></LocalizationProvider>);
  const FN = screen.getByTestId("fullName");
  FN.focus();
  FN.blur();
  const req = await screen.findByText("Required")
  expect(req).toBeInTheDocument();
})

test("email validation", async () => {
  render(<LocalizationProvider dateAdapter={AdapterDayjs}><BookingForm /></LocalizationProvider>);
  const EM = screen.getByTestId("email");
  act(() => {
    userEvent.type(EM, "123");
  })
  EM.blur();
  const vld = await screen.findByText("You must enter a valid email address")
  expect(vld).toBeInTheDocument();
})

test("phone number validation", async () => {
  render(<LocalizationProvider dateAdapter={AdapterDayjs}><BookingForm /></LocalizationProvider>);
  const PN = screen.getByTestId("phone");
  act(() => {
    userEvent.type(PN, "name");
  })
  userEvent.tab();
  const vld = await screen.findByText("You must enter a valid phone number")
  expect(vld).toBeInTheDocument()
})