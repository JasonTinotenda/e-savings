import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoanData, applyForLoan, toggleModal } from '../../redux/LoanSlice';
import { iconsImgs } from "../../utils/images";
import './Loans.css';

const Loans = () => {
  const dispatch = useDispatch();
  const { loanAmount, loanRepaid, percentage, isModalOpen } = useSelector((state) => state.loans);

  useEffect(() => {
    dispatch(fetchLoanData());
  }, [dispatch]);

  return (
    <div className="subgrid-two-item grid-common grid-c7">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Loans</h3>
        <button className="grid-c-title-icon" onClick={() => dispatch(toggleModal())}>
          <img src={iconsImgs.plus} alt="Apply for a new loan" />
        </button>
      </div>
      <div className="grid-c7-content">
        <div className="progress-bar">
          <div className="percent">
            <svg>
              <circle cx="103" cy="105" r="50"></circle>
              <circle cx="105" cy="105" r="50" style={{ strokeDasharray: `${percentage * 3.14 * 2}`, strokeDashoffset: `${(100 - percentage) * 3.14 * 2}` }}></circle>
            </svg>
            <div className="number">
              <h3>{percentage}<span>%</span></h3>
            </div>
          </div>
        </div>
        <ul className="data-list">
          <li className="data-item text-silver-v1">
            <span className="data-item-text">Loan Amount</span>
            <span className="data-item-value">${loanAmount.toLocaleString()}</span>
          </li>
          <li className="data-item text-silver-v1">
            <span className="data-item-text">Loan Repaid</span>
            <span className="data-item-value">${loanRepaid.toLocaleString()}</span>
          </li>
        </ul>
      </div>

      {/* Modal for applying new loans */}
      {isModalOpen && (
        <div className="loan-modal">
          <div className="modal-content">
            <h3>Apply for a New Loan</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const loanType = formData.get('loanType');
              dispatch(applyForLoan(loanType));
            }}>
              <label>
                <input type="radio" name="loanType" value="short-term" required />
                Short-Term Loan
              </label>
              <label>
                <input type="radio" name="loanType" value="long-term" required />
                Long-Term Loan
              </label>
              <button type="submit">Apply</button>
            </form>
            <button onClick={() => dispatch(toggleModal())}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
