
import React from 'react'


function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div>
    Auth Layout
    {children}
</div>
  );
}

export default AuthLayout