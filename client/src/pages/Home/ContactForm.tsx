import React, { useState } from 'react';

// ... (interface FormData and interface ContactFormProps remain the same) ...
interface FormData {
  name: string;
  mobile: string;
  education: string;
  course: string;
  dob: string;
}

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm = ({ onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    education: '',
    course: '',
    dob: '',
  });
  // Add loading and error states for better UX
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


  const courses = [
    'Full-Stack Web Development',
    'Data Science & Machine Learning',
    'Cloud Computing & DevOps',
    'Digital Marketing',
    'Cybersecurity',
    'UX/UI Design',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ==========================================================
  // MODIFIED handleSubmit FUNCTION
  // ==========================================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      // Change this URL to your PHP script's location
      const response = await fetch(`${API_URL}submit-form.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Try to get error message from response body
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong on the server.');
      }
      
      const result = await response.json();
      console.log('Server Response:', result);
      
      alert('Thank you for your submission! We will be in touch shortly.');
      onClose();

      // Reset form on successful submission
      setFormData({
        name: '',
        mobile: '',
        education: '',
        course: '',
        dob: '',
      });

    } catch (error) {
      console.error('Submission Error:', error);
      // Set the error state to display a message to the user
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred.');
      alert(`Submission failed: ${error instanceof Error ? error.message : 'Please try again later.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* ... (Left side content remains the same) ... */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-16 bg-gray-50 flex flex-col justify-center">
             <div>
               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                 Enroll in Your Future
               </h2>
               <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6">
                 Take the next step in your career by joining one of our industry-leading courses. Fill
                 out the form to get in touch with our admissions team.
               </p>
               <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                 We provide hands-on training, expert instructors, and a vibrant community to help you
                 succeed. Let's build something great together.
               </p>
             </div>
           </div>

          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* ... (All form inputs remain the same) ... */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base sm:py-2.5 lg:py-3"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base sm:py-2.5 lg:py-3"
                  />
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split("T")[0]}
                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base sm:py-2.5 lg:py-3"
                  />
                </div>
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                    Highest Education Qualification
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base sm:py-2.5 lg:py-3"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                    Select Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-base sm:py-2.5 lg:py-3"
                  >
                    <option value="" disabled>Please select a course</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting} // Disable button while submitting
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 sm:text-base sm:py-3 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request a Callback'}
                  </button>
                  {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;