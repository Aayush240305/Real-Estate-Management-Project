import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function ContactQueries() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(
          "/api/v1/admin/contacts",
          { withCredentials: true }
        );
        setContacts(res.data.data || []);
      } catch (error) {
        toast.error("Failed to load contact queries");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar title="Contact Queries" />

      <div className="mt-20 flex-1 overflow-y-auto p-10 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Contact Queries
          </h1>
          <p className="text-gray-500 mt-2">
            Review and manage messages submitted by users
          </p>
        </div>

        {loading && (
          <div className="text-gray-600 animate-pulse">
            Loading queries...
          </div>
        )}

        {!loading && contacts.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-lg">
              No queries received yet.
            </p>
          </div>
        )}

        {!loading && contacts.length > 0 && (
          <div className="space-y-8">

            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300"
              >

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {contact.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {contact.email}
                    </p>

                    {contact.subject && (
                      <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                        {contact.subject}
                      </span>
                    )}
                  </div>

                  <div className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 self-start">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>

                </div>

                <div className="mt-6 bg-gray-50 rounded-xl p-6 text-sm text-gray-700 leading-relaxed">
                  {contact.message}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default ContactQueries;