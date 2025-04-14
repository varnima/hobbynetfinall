import React from 'react';
import './ProfilePage.css';

export default function ProfilePage() {
  const user = {
    name: 'Varnima Sharma',
    tagline: 'Passionate Painter & Mentor',
    bio: 'I love teaching art and exploring creative ways to express emotions through colors.',
    hobbies: ['Painting', 'Sketching', 'Watercolors'],
    ratings: 4.8,
    reviews: ['Very helpful mentor!', 'Great guidance on techniques.', 'Loved the session!'],
    portfolio: ['https://example.com/art1.jpg', 'https://example.com/art2.jpg'],
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-bg" src="/bg-art.jpg" alt="Background" />
        <div className="profile-avatar">
          <img src="/avatar.png" alt="User Avatar" />
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-tagline">{user.tagline}</p>
      </div>

      <div className="profile-content">
        <section className="profile-section bio">
          <h3>Bio</h3>
          <p>{user.bio}</p>
        </section>

        <section className="profile-section hobbies">
          <h3>Hobbies</h3>
          <ul>
            {user.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </section>

        <section className="profile-section buttons">
          <button className="edit-btn">Edit Profile</button>
          <button className="msg-btn">Message</button>
          <button className="req-btn">Request Session</button>
        </section>

        <section className="profile-section reviews">
          <h3>Ratings & Reviews</h3>
          <p className="rating">⭐ {user.ratings} / 5</p>
          <ul>
            {user.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        </section>

        <section className="profile-section portfolio">
          <h3>Portfolio</h3>
          <div className="portfolio-grid">
            {user.portfolio.map((url, index) => (
              <img key={index} src={url} alt={`Portfolio ${index}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
