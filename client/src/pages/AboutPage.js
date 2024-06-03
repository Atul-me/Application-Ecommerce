import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-5">
        <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
          {/* Image on the left */}
          <div className="md:w-1/2">
            <img
              src="https://res.cloudinary.com/dsvgtprgh/image/upload/v1717323834/ep7bygh5k9te6c3s0fb1.jpg"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          {/* Text on the right */}
          <div className="md:w-1/2 space-y-4">
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. 
              Morbi aliquam felis vel felis placerat, at auctor neque pharetra. Mauris non felis tempus, fringilla arcu quis, 
              fringilla arcu. Integer sit amet eros a sapien condimentum vehicula. Suspendisse potenti. Nam vitae sem tempor, 
              tristique orci eu, vulputate felis. Donec tristique aliquam dui, id feugiat enim suscipit eget. Nam tincidunt 
              pharetra magna. Nulla volutpat ex eu tellus dignissim, in facilisis dui gravida. Integer nec diam sed erat posuere 
              lobortis. Sed consequat, ligula in sollicitudin efficitur, nisl erat iaculis sem, a tincidunt metus tortor a risus. 
              Aenean eget ullamcorper arcu. Vivamus vulputate libero eu libero commodo convallis. Praesent feugiat libero a erat 
              placerat cursus.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
