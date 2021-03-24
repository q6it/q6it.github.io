// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useState } from 'react';
// import { Grid, Button, Label, Form } from 'semantic-ui-react';
// import { useFormik, Field, Formik } from 'formik';
// import { number, string } from 'yup';

// export const OrderSettings = () => {
//   const initialValues = {
//     pair: '',
//     priceStep: 0,
//     priceSize: 0,
//     price: '',
//     limitAmount: '',
//   };

//   const [orderData, setOrderData] = useState({});
//   console.log('🚀 ~ file: OrderSettings.tsx ~ line 28 ~ orderData', orderData);

//   return (
//     <>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={async (values) => {
//           console.log('🚀 ~ file: OrderSettings.tsx ~ line 30 ~ values', values);
//           const convertValues = { ...values, priceStep: parseInt(values.priceStep, 10) };
//           setOrderData(convertValues);
//           console.log(
//             '🚀 ~ file: OrderSettings.jsx ~ line 27 ~ onSubmit={ ~ convertValues',
//             convertValues
//           );
//         }}
//       >
//         {({ values, handleSubmit, setFieldValue }) => (
//           <Form onSubmit={handleSubmit}>
//             <Grid>
//               <Grid.Row>
//                 <Form.Field>
//                   <label htmlFor="pair">
//                     Pair:
//                     <Field id="pair" name="pair" as="input" placeholder="Insert pair" />
//                   </label>
//                 </Form.Field>
//               </Grid.Row>
//               <Grid.Row>
//                 <Form.Field>
//                   <label htmlFor="priceStep">
//                     Price step:
//                     <Field
//                       id="priceStep"
//                       name="priceStep"
//                       placeholder="Insert price step"
//                       // onChange={(e) => {
//                       //   // TODO: change to int
//                       //   setFieldValue(e.target.name, e.target.value);
//                       // }}
//                     />
//                   </label>
//                 </Form.Field>
//               </Grid.Row>
//               <Grid.Row>
//                 <Form.Field>
//                   <label htmlFor="sizeStep">
//                     Size step:
//                     <Field
//                       id="sizeStep"
//                       name="sizeStep"
//                       label="Size Step"
//                       placeholder="Insert pair"
//                     />
//                   </label>
//                 </Form.Field>
//               </Grid.Row>
//               <Grid.Row>
//                 <Field label="Price" placeholder="Insert pair" />
//               </Grid.Row>
//               <Grid.Row>
//                 <Field label="Limit" placeholder="Insert pair" />
//               </Grid.Row>
//             </Grid>
//             <Button type="submit">Create Orders</Button>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };
