import { db } from '@/src/db';
import { admin } from '@/src/db/schema';
import { Admin, AdminInputType } from '@/src/db/types';
import { eq } from 'drizzle-orm';

export async function handleCreateAdmin(input: AdminInputType): Promise<Admin> {
  const exists = await db.query.admin.findFirst({
    where: eq(admin.email, input.email),
  });

  if (exists) throw new Error('Email already exists');

  const [created] = await db.insert(admin).values(input).returning();

  return created;
}

export async function getAdminByEmail(email: string) {
  const result = await db.query.admin.findFirst({
    where: eq(admin.email, email),
  });

  if (!result) throw new Error('Admin not found');

  return result;
}

export async function updatePassword(email: string, password: string) {
  const [updated] = await db
    .update(admin)
    .set({ password })
    .where(eq(admin.email, email))
    .returning();

  if (!updated) throw new Error('Admin not found');

  return updated;
}
