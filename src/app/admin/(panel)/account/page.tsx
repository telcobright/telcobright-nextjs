import { getCurrentUser, listUsers } from '@/server/auth';
import { removeUserAction } from '@/app/admin/actions';
import { AddUserForm, ChangePasswordForm } from '@/components/admin/AccountForms';
import { PageHeading, Panel } from '@/components/admin/ui';

export default async function AccountPage() {
  const [me, users] = await Promise.all([getCurrentUser(), listUsers()]);

  return (
    <>
      <PageHeading title="Account" description="Your password, and who else can sign in." />

      <Panel title="Your password">
        <ChangePasswordForm />
      </Panel>

      <Panel title="Who can sign in" description="Everyone listed has full access to the editor.">
        <table className="adm-table mb-6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Added</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="font-medium text-ink-900">
                  {user.name}
                  {user.id === me?.id && <span className="ml-2 adm-chip">You</span>}
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
                <td className="text-right">
                  {user.id !== me?.id && (
                    <form action={removeUserAction.bind(null, user.id)}>
                      <button type="submit" className="adm-btn-danger">
                        Remove
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-ink-200/70 pt-6">
          <h3 className="adm-section-title mb-4">Add someone</h3>
          <AddUserForm />
        </div>
      </Panel>
    </>
  );
}

export const dynamic = 'force-dynamic';
