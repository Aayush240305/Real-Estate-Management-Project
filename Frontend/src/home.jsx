import React from 'react'
import {Link} from 'react-router-dom'

export default function Home(){

  return(
      <>
      <header className="w-full h-18 bg-white border-b border-gray-100">
  <div className="flex items-center justify-between px-4 lg:px-10 h-full max-w-full mx-auto">

    <img
      src="/src/Images/Logo.png"
      alt="logo"
      className="h-38 w-auto object-contain"
    />

    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

        <a href="#home" className="relative group">
    Home
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#features" className="relative group">
    Features
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#properties" className="relative group">
    Properties
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
  </a>

  <a href="#aboutus" className="relative group">
    About Us
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
  </a>


  <a href="#review" className="relative group">
    Review
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
  </a>

  
    </nav>

    <div className="flex items-center gap-3">

      <Link
        to="/login"
        className="px-4 py-2 rounded-full text-sm font-medium text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="px-5 py-2 rounded-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow-md transition"
      >
        Sign Up
      </Link>

    </div>

  </div>
</header>
 <section  id="home" className="relative flex flex-col items-center justify-center text-center text-white px-6 py-40 overflow-hidden">

  <div className="absolute inset-0 -z-20">
    <img
      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920"
      alt="Luxury Property"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="absolute inset-0 bg-black/60 -z-10"></div>

  <div className="flex items-center gap-4 px-5 py-2 rounded-full border border-white/30 backdrop-blur-md bg-white/10 text-sm">

    <div className="flex -space-x-3">
      <img
        className="w-8 h-8 rounded-full border-2 border-white object-cover"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
        alt=""
      />
      <img
        className="w-8 h-8 rounded-full border-2 border-white object-cover"
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
        alt=""
      />
      <img
        className="w-8 h-8 rounded-full border-2 border-white object-cover"
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50"
        alt=""
      />
    </div>

    <p className="text-xs md:text-sm">
      Trusted by 500+ property owners & buyers
    </p>

  </div>

  <h1 className="mt-8 text-4xl md:text-6xl font-bold max-w-4xl leading-tight">
    Find Your <span className="text-indigo-400">Dream Property</span> with Confidence
  </h1>

  <p className="mt-6 text-base md:text-lg max-w-2xl text-gray-200">
    Explore verified listings, connect with trusted owners, and
    experience a seamless property journey with Homesphere.
  </p>

  <div className="flex flex-col sm:flex-row items-center gap-5 mt-10">

    <Link
      to="/signup"
      className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold shadow-lg transition duration-300"
    >
      Explore Properties
    </Link>
  </div>

</section>

    <section id="features" className="relative bg-gradient-to-b from-white to-indigo-50 py-24 px-6 lg:px-10">

  <div className="max-w-7xl mx-auto">

    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        Why Choose <span className="text-indigo-600">Homesphere</span>?
      </h2>

      <p className="text-gray-600 text-lg mt-6">
        We simplify buying, selling, and renting with verified listings,
        smart search, and a seamless digital experience.
      </p>
    </div>

    <div className="mt-20 grid lg:grid-cols-2 gap-16 items-center">

      <div className="relative flex justify-center items-center">

        <div className="absolute w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>

        <div className="relative grid grid-cols-2 gap-6">

          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600"
            className="w-56 h-72 object-cover rounded-3xl shadow-2xl"
            alt="Modern House"
          />

          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600"
            className="w-56 h-72 object-cover rounded-3xl shadow-2xl mt-12"
            alt="Luxury Interior"
          />

        </div>

      </div>

      <div className="space-y-8">

        <div className="group p-7 rounded-3xl bg-white shadow-sm hover:shadow-xl transition duration-300 flex gap-5 items-start border border-gray-100">
          <div className="bg-green-100 group-hover:bg-green-200 text-2xl p-4 rounded-2xl transition">
            🏡
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              Verified & Trusted Properties
            </h3>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Every property is carefully reviewed to ensure clear ownership,
              legal compliance, and complete transparency.
            </p>
          </div>
        </div>

        <div className="group p-7 rounded-3xl bg-white shadow-sm hover:shadow-xl transition duration-300 flex gap-5 items-start border border-gray-100">
          <div className="bg-yellow-100 group-hover:bg-yellow-200 text-2xl p-4 rounded-2xl transition">
            🗺️
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              Smart Location-Based Search
            </h3>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Discover properties using intelligent filters by city,
              neighborhood, landmarks, and more.
            </p>
          </div>
        </div>

        <div className="group p-7 rounded-3xl bg-white shadow-sm hover:shadow-xl transition duration-300 flex gap-5 items-start border border-gray-100">
          <div className="bg-sky-100 group-hover:bg-sky-200 text-2xl p-4 rounded-2xl transition">
            🚀
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              Fast & Hassle-Free Process
            </h3>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              From search to final decision, we streamline every step to
              make your property journey smooth and stress-free.
            </p>
          </div>
        </div>

      </div>

    </div>

  </div>

</section>
    <section id="properties" className="bg-gradient-to-b from-white to-indigo-50 py-24 px-6 lg:px-10">

  <div className="max-w-7xl mx-auto">

    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        Featured <span className="text-indigo-600">Properties</span>
      </h2>

      <p className="text-gray-600 text-lg mt-6">
        Discover handpicked premium homes in the most desirable locations.
      </p>
    </div>

    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100">

        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
            className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
            alt="Modern Apartment"
          />
          <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            For Sale
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-900">
            Modern Apartment
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            2 Beds • 2 Baths • 1,200 sqft
          </p>
          <p className="text-indigo-600 font-semibold mt-4 text-lg">
            ₹30 Lakhs
          </p>
        </div>

      </div>

      <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100">

        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800"
            className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
            alt="Suburban House"
          />
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-900">
            Cozy Suburban House
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            3 Beds • 2 Baths • 1,800 sqft
          </p>
          <p className="text-indigo-600 font-semibold mt-4 text-lg">
            ₹35 Lakhs
          </p>
        </div>

      </div>

      <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100">

        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800"
            className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
            alt="Luxury Villa"
          />
          <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
            Luxury
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-900">
            Luxury Villa with Pool
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            4 Beds • 3 Baths • 3,500 sqft
          </p>
          <p className="text-indigo-600 font-semibold mt-4 text-lg">
            ₹50 Lakhs
          </p>
        </div>

      </div>

      <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100">

        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=800"
            className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
            alt="Charming Cottage"
          />
          <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
            Popular
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-900">
            Charming Cottage
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            2 Beds • 1 Bath • 900 sqft
          </p>
          <p className="text-indigo-600 font-semibold mt-4 text-lg">
            ₹25 Lakhs
          </p>
        </div>

      </div>

    </div>

    <div className="text-center mt-16">
      <a
        href="/login"
        className="inline-block bg-indigo-600 text-white px-10 py-3 rounded-full text-sm font-semibold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition duration-300"
      >
        Explore More Properties
      </a>
    </div>

  </div>

</section>
<section id="aboutus" className="flex flex-col md:flex-row items-center justify-center gap-16 px-6 lg:px-10 py-24 bg-gradient-to-b from-white to-indigo-50">

  <div className="relative rounded-3xl overflow-hidden shadow-2xl shrink-0">

    <img
      className="max-w-md w-full h-[420px] object-cover rounded-3xl"
      src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=900"
      alt="Modern Property Interior"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

    <div className="absolute bottom-6 left-6 text-white">
      <h3 className="text-lg font-semibold">Premium Living Spaces</h3>
      <p className="text-sm text-gray-200">Designed for comfort & elegance</p>
    </div>

  </div>

  <div className="text-slate-600 max-w-lg">

    <h2 className="text-3xl font-bold text-gray-900">
      What We Do at <span className="text-indigo-600">Homesphere</span>
    </h2>

    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-indigo-300 mt-3"></div>

    <p className="mt-8 leading-relaxed">
      Homesphere connects property buyers and sellers through a secure,
      transparent, and easy-to-use platform built for modern real estate needs.
    </p>

    <p className="mt-4 leading-relaxed">
      Whether you're searching for your dream home or listing a premium property,
      we provide verified listings, smart filters, and a seamless digital experience.
    </p>

    <p className="mt-4 leading-relaxed">
      Our mission is to simplify real estate transactions while building trust
      and confidence at every step of the journey.
    </p>
  </div>

</section>
<section id="review" className="bg-gradient-to-b from-indigo-50 to-white py-24 px-6 lg:px-10">

  <div className="max-w-7xl mx-auto">

    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        What Our <span className="text-indigo-600">Clients Say</span>
      </h2>
      <p className="text-gray-600 text-lg mt-6">
        Real stories from happy buyers and property owners.
      </p>
    </div>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">

      <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100">

        <div className="flex text-indigo-500 mb-5">
          {Array(5).fill(0).map((_, i) => (
            <svg key={i} width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.431L24 9.75l-6 5.845 1.416 8.255L12 18.896l-7.416 4.954L6 15.595 0 9.75l8.332-1.732z"/>
            </svg>
          ))}
        </div>

        <p className="text-gray-600 leading-relaxed italic">
          "Homesphere made my home buying journey smooth and stress-free.
          The verified listings gave me complete confidence in my decision."
        </p>

        <div className="flex items-center gap-4 mt-8">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100"
            alt="Sneha"
          />
          <div>
            <h4 className="font-semibold text-gray-900">Sneha Patil</h4>
            <p className="text-sm text-gray-500">Home Buyer</p>
          </div>
        </div>

      </div>

      <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100">

        <div className="flex text-indigo-500 mb-5">
          {Array(5).fill(0).map((_, i) => (
            <svg key={i} width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.431L24 9.75l-6 5.845 1.416 8.255L12 18.896l-7.416 4.954L6 15.595 0 9.75l8.332-1.732z"/>
            </svg>
          ))}
        </div>

        <p className="text-gray-600 leading-relaxed italic">
          "The smart search filters helped us find the perfect neighborhood.
          Homesphere truly understands modern buyers."
        </p>

        <div className="flex items-center gap-4 mt-8">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100"
            alt="Rahul"
          />
          <div>
            <h4 className="font-semibold text-gray-900">Rahul Sharma</h4>
            <p className="text-sm text-gray-500">Property Buyer</p>
          </div>
        </div>

      </div>

      <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100">

        <div className="flex text-indigo-500 mb-5">
          {Array(5).fill(0).map((_, i) => (
            <svg key={i} width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.431L24 9.75l-6 5.845 1.416 8.255L12 18.896l-7.416 4.954L6 15.595 0 9.75l8.332-1.732z"/>
            </svg>
          ))}
        </div>

        <p className="text-gray-600 leading-relaxed italic">
          "Fast, transparent, and reliable. Buying my first home felt
          effortless with Homesphere."
        </p>

        <div className="flex items-center gap-4 mt-8">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100"
            alt="Amit"
          />
          <div>
            <h4 className="font-semibold text-gray-900">Amit Kulkarni</h4>
            <p className="text-sm text-gray-500">First-Time Buyer</p>
          </div>
        </div>

      </div>

    </div>

  </div>

</section>
<footer className="w-full bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800">

  <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center">

    <div className="flex items-center space-x">
      <img
        alt="Homesphere Logo"
        className="h-42"
        src="/src/Images/Logo.png"
      />
    </div>

    <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
      Homesphere empowers property buyers and sellers with a modern, secure,
      and transparent real estate experience. Discover verified listings,
      explore confidently, and turn your property goals into reality.
    </p>

  </div>

  <div className="border-t border-slate-200">

    <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
      <a href="#">Homesphere</a> ©2026. All rights reserved.
    </div>

  </div>

</footer>

      </>
    )
}