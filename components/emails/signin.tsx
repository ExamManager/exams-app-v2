import * as React from 'react';

interface EmailTemplateProps {
  otp: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  otp,
}) => (
  <div>
    <h1>SignIn to ExamDashboard!</h1>
    <p>
      SignIn your account by clicking the link below: <br />
      {otp}
    </p>
  </div>
);
