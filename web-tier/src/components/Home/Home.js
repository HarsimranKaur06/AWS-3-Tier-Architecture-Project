import React, { Component } from 'react';
import image1 from '../../assets/SlideShow-Image1.jpeg'; // Replace with your actual images
import image2 from '../../assets/SlideShow-Image2.jpeg';
import image3 from '../../assets/SlideShow-Image3.jpeg';

class Home extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Jordon Office Furnitures</h1>
        <div style={styles.imageContainer}>
          <img src={image1} alt="Office Chair" style={styles.image} />
          <img src={image2} alt="Laptop Table" style={styles.image} />
          <img src={image3} alt="Table Lamp" style={styles.image} />
        </div>
        <section style={styles.aboutSection}>
          <h2>About Us</h2>
          <p>
            Welcome to Jordon Home Innovations. We specialize in providing high-quality office furniture designed for comfort and style. Our extensive catalog includes everything from ergonomic chairs to elegant desks, ensuring you find the perfect fit for your workspace.
          </p>
        </section>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#f4f0ec',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  title: {
    color: 'blue',
    marginBottom: '20px',
    textAlign: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
    marginBottom: '20px',
  },
  image: {
    height: '400px',
    width: '30%',
    objectFit: 'cover',
  },
  aboutSection: {
    textAlign: 'center',
    maxWidth: '800px',
  },
};

export default Home;