export async function sendResetPasswordMail(
  email: string,
  token: string,
): Promise<void> {
  const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
  // En dev, on affiche juste le lien
  console.log(`Lien de réinitialisation pour ${email}: ${resetLink}`);

  //todo: envoyer un mail avec le lien de réinitialisation
  // Pour envoyer un vrai mail : intégrer ici nodemailer/sendgrid/etc.
  // exemple nodemailer : transporter.sendMail({...})
}
