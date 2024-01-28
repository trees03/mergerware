import { Meteor } from 'meteor/meteor';
import { Loans, Users } from './';

Meteor.methods({
  'users.register'(email, role) {
    return Users.insert({ email, role });
  },
  'loans.requestLoan'(borrowerId, amount) {
    return Loans.insert({ borrowerId, amount, status: 'pending' });
  },
  'loans.confirmPayment'(loanId, lenderId) {
    Loans.update({ _id: loanId }, { $set: { status: 'paid', lenderId } });
  },
});
