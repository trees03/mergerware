import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../api/users';
import { Loans } from '../api/loans';

const App = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const users = useTracker(() => Users.find().fetch());
  const loans = useTracker(() => Loans.find().fetch());

  const handleRegister = () => {
    Meteor.call('users.register', email, role);
  };

  const handleRequestLoan = (borrowerId, amount) => {
    Meteor.call('loans.requestLoan', borrowerId, amount);
  };

  const handleConfirmPayment = (loanId, lenderId) => {
    Meteor.call('loans.confirmPayment', loanId, lenderId);
  };

  return (
    <div>
      <h1>Loan App</h1>

      <div>
        <h2>Register User</h2>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="borrower">Borrower</option>
          <option value="lender">Lender</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.email} - {user.role}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Loans</h2>
        <ul>
          {loans.map((loan) => (
            <li key={loan._id}>
              Borrower ID: {loan.borrowerId} - Amount: ${loan.amount} - Status: {loan.status}
              {loan.lenderId && ` - Lender ID: ${loan.lenderId}`}
              {loan.status === 'pending' && (
                <button onClick={() => handleConfirmPayment(loan._id, 'lenderId')}>
                  Confirm Payment
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
