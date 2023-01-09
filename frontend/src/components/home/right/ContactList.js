export default function ContactList({ user }) {
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <img src={user.picture} alt="user profile img" />
      </div>
      <span>
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
}
