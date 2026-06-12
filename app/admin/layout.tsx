import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export const metadata = { title: 'Admin | Portfolio' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        background: '#0d0f1a',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right column */}
      <div
        className="admin-layout"
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#111420',
        }}
      >
        <AdminHeader user={session.user} />

        {/* Scrollable page area */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            background: '#111420',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '14px 36px',
              textAlign: 'center',
              fontSize: 10,
              fontFamily: 'monospace',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.1)',
              textTransform: 'uppercase',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              flexShrink: 0,
            }}
          >
            Powered by Portfolio CMS Engine
          </div>
        </main>
      </div>
    </div>
  );
}
