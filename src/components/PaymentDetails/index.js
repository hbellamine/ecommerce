import React, { useState } from "react";
import FormInput from "./../Forms/FormInput";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import Button from "./../Forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import "./styles.scss";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};
const PaymentDetails = () => {
  const elements = useElements();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !shippingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName || !nameOnCard 
    ) {
        return
    }
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;

    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping Adress</h2>
          <FormInput
          required
            type="text"
            name="recipientName"
            placeholder="Recipient Name"
            handleChange={(evt) => setRecipientName(evt.target.value)}
            value={recipientName}
          />
          <FormInput
          required
            type="text"
            name="line1"
            handleChange={(evt) => handleShipping(evt)}
            placeholder="Line 1"
            value={shippingAddress.line1}
          />
          <FormInput
            type="text"
            name="line2"
            handleChange={(evt) => handleShipping(evt)}
            placeholder="Line 2"
            value={shippingAddress.line2}
          />
          <FormInput
          required
            type="text"
            name="city"
            handleChange={(evt) => handleShipping(evt)}
            placeholder=" City "
            value={shippingAddress.city}
          />
          <FormInput
          required
            type="text"
            name="state"
            handleChange={(evt) => handleShipping(evt)}
            placeholder="State"
            value={shippingAddress.state}
          />
          <FormInput
          required
            type="text"
            name="postal_code"
            handleChange={(evt) => handleShipping(evt)}
            placeholder=" Postal Code"
            value={shippingAddress.postal_code}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
            required
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Billing Adress</h2>
          <FormInput
          required
            type="text"
            name="nameOnCard"
            handleChange={(evt) => setRecipientName(evt.target.value)}
            placeholder="Name on Card"
            value={nameOnCard}
          />
          <FormInput
          required
            type="text"
            name="line1"
            placeholder="Line 1"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line1}
          />
          <FormInput
            type="text"
            name="line2"
            handleChange={(evt) => handleBilling(evt)}
            placeholder="Line 2"
            value={billingAddress.line2}
          />
          <FormInput
          required
            type="text"
            name="city"
            handleChange={(evt) => handleBilling(evt)}
            placeholder="City"
            value={billingAddress.city}
          />
          <FormInput
          required
            type="text"
            name="state"
            handleChange={(evt) => handleBilling(evt)}
            placeholder="State"
            value={billingAddress.state}
          />
          <FormInput
          required
            type="text"
            name="postal_code"
            handleChange={(evt) => handleBilling(evt)}
            placeholder=" Postal Code"
            value={billingAddress.postal_code}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
            required
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Card Details</h2>
          <CardElement options={configCardElement} />
        </div>
        <Button type="submit">Pay Now</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
