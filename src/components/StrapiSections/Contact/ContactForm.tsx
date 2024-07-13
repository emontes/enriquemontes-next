'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const ContactForm = ({ messages, locale }) => {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ContactFormContent />
    </NextIntlClientProvider>
  );
};
const ContactFormContent = () => {
  const t = useTranslations('ContactForm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    mobilephone: '',
    country: '',
    city: '',
    state: '',
    comment: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('emailInvalid')).required(t('required')),
    firstname: Yup.string().required(t('required')),
    lastname: Yup.string().required(t('required')),
    phone: Yup.string().required(t('required')),
    mobilephone: Yup.string().required(t('required')),
    country: Yup.string().required(t('required')),
    city: Yup.string().required(t('required')),
    state: Yup.string().required(t('required')),
    comment: Yup.string().required(t('required')),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    setError(null);

    const postData = new URLSearchParams({
      ...values,
      hs_context: JSON.stringify({
        pageUrl: "https://enriquemontes.com/contact",
        pageName: "Mensaje desde EnriqueMontes.com",
      }),
    });

    try {
      const response = await axios.post(
        'https://forms.hubspot.com/uploads/form/v2/6942869/2ef78e0f-1292-4446-8941-1ad37f7839dc',
        postData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log(response.data);
      setIsSubmitted(true);
      resetForm();
    } catch (error) {
      console.error(error);
      setError(t('submitError'));
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
        <p className="font-bold">{t('success')}</p>
        <p>{t('thankYou')}</p>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstname">
                {t('firstname')}
              </label>
              <Field
                type="text"
                name="firstname"
                id="firstname"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder={t('firstname')}
              />
              <ErrorMessage name="firstname" component="p" className="text-red-500 text-xs italic" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastname">
                {t('lastname')}
              </label>
              <Field
                type="text"
                name="lastname"
                id="lastname"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder={t('lastname')}
              />
              <ErrorMessage name="lastname" component="p" className="text-red-500 text-xs italic" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              {t('email')}
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder={t('email')}
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic" />
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                {t('phone')}
              </label>
              <Field
                type="tel"
                name="phone"
                id="phone"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder={t('phone')}
              />
              <ErrorMessage name="phone" component="p" className="text-red-500 text-xs italic" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="mobilephone">
                {t('mobilephone')}
              </label>
              <Field
                type="tel"
                name="mobilephone"
                id="mobilephone"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder={t('mobilephone')}
              />
              <ErrorMessage name="mobilephone" component="p" className="text-red-500 text-xs italic" />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="country">
                {t('country')}
              </label>
              <Field
                type="text"
                name="country"
                id="country"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder={t('country')}
              />
              <ErrorMessage name="country" component="p" className="text-red-500 text-xs italic" />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                {t('city')}
              </label>
              <Field
                type="text"
                name="city"
                id="city"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder={t('city')}
              />
              <ErrorMessage name="city" component="p" className="text-red-500 text-xs italic" />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                {t('state')}
              </label>
              <Field
                type="text"
                name="state"
                id="state"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder={t('state')}
              />
              <ErrorMessage name="state" component="p" className="text-red-500 text-xs italic" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="comment">
              {t('comment')}
            </label>
            <Field
              as="textarea"
              name="comment"
              id="comment"
              rows="4"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder={t('comment')}
            />
            <ErrorMessage name="comment" component="p" className="text-red-500 text-xs italic" />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </div>

          {error && <div className="text-red-500 mt-4">{error}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;