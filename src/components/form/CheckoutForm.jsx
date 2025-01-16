
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import PropTypes from 'prop-types'

import './CheckoutForm.css'

import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import Button from '../shared/Button'
import useRole from '../../hooks/useRole'



const CheckoutForm = ({ closeModal, coinPackage }) => {
  const [,,refetch]= useRole()
  const {user}= useAuth()  
  const axiosSecure = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    getPaymentIntent()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinPackage])
  console.log(clientSecret)
  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        package: coinPackage?.price,
        email: user?.email,
      })
      setClientSecret(data.clientSecret)
    } catch (err) {
      console.log(err)
    }
  }

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    setProcessing(true)
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    const card = elements.getElement(CardElement)

    if (card == null) {
      setProcessing(false)
      return
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })
    if (error) {
      setProcessing(false)
      return console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
    }
    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'anynomous',
          email: user?.email || "N/A",
        },
      },
    })

    if (paymentIntent.status === 'succeeded') {
      try {
        // Save data in db
        await axiosSecure.post('/order', {
          ...coinPackage,
          transactionId: paymentIntent?.id,
          buyerEmail: user?.email
        })
        // increase coin for buyer
        await axiosSecure.patch(`/users/coin/${user?.email}`, {
            coinsToUpdate: coinPackage?.coins,
          
        })
        toast.success('Coin Purchase  Successful!')
        refetch()
      } catch (err) {
        toast.error("Invalid Card")
        console.log(err)
      } finally {
        setProcessing(false)
        closeModal()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className='flex justify-around mt-2 gap-2'>
      <Button
          disabled={!stripe || !clientSecret || processing}
          type='submit'
          label={`Pay ${coinPackage?.price}$`}
        />
        <Button outline={true} onClick={closeModal} label={'Cancel'} />
      </div>
    </form>
  )
}
CheckoutForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  coinPackage: PropTypes.object,
  
}

export default CheckoutForm