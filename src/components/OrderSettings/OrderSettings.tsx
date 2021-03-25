/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Grid, Button, Form, Dropdown, Checkbox } from 'semantic-ui-react';
import { Field, Formik } from 'formik';

import { getExchangeInfo } from '../../api/binanceApi';
import { requests } from '../../api';

import './OrderSettings.scss';

interface OrderSettingsProps {
  setOrderData?: React.Dispatch<React.SetStateAction<any>>;
}
export const OrderSettings: React.FC<OrderSettingsProps> = () => {
  interface FormikInterface {
    symbol: string;
    priceStep: number;
    sizeStep: number;
    price: string;
    limit: number;
  }
  const initialValues: FormikInterface = {
    symbol: '',
    priceStep: 0,
    sizeStep: 0,
    price: '',
    limit: 0,
  };

  const [allSymbols, setAllSymbols] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [selectedSymbolPrice, setSelectedSymbolPrice] = useState<string>('');
  const [orderData, setOrderData] = useState(initialValues);
  const [useCurrentPrice, setUseCurrentPrice] = useState(false);

  const myArrayOfSymbols: string[] = [
    'ETHBTC',
    'ETHEUR',
    'BTCEUR',
    'BNBEUR',
    'BTCDOWNUSDT',
    'BTCUSDT',
    'EURUSDT',
    'BTCUSDT',
    'ETHUSDT',
    'BNBUSDT',
  ];
  const filterSymbols = (symbols: string[]): string[] => {
    return symbols.filter((symbol) => myArrayOfSymbols.includes(symbol));
  };

  const getPrice = async () => {
    const { data } = await requests.ticker(selectedSymbol);
    setSelectedSymbolPrice(data.response.price);
  };

  useEffect(() => {
    console.log('%c Log:', 'background: #2C2C2C; color: #18C828;', 'rendered');
    let isMounted = true;
    (async () => {
      if (isMounted) {
        interface ExchangeArray {
          symbol: string;
        }
        const symbolsData: ExchangeArray[] = await getExchangeInfo();
        const symbols = symbolsData.map((x: any): string => x.symbol);
        const filteredSymbols = filterSymbols(symbols);
        setAllSymbols(filteredSymbols);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedSymbol !== '') getPrice();
  }, [selectedSymbol]);

  useEffect(() => {
    if (Object.keys(orderData).length !== 0) requests.orders(orderData);
  }, [selectedSymbolPrice, orderData]);

  const showPair = () => {
    return allSymbols.map((symbol) => ({
      key: symbol,
      value: symbol,
      text: symbol,
    }));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: FormikInterface) => {
          const currentPrice = useCurrentPrice ? selectedSymbolPrice : '';
          setOrderData({ ...values, price: currentPrice });
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form>
            <Grid stackable padded="horizontally" columns={3}>
              <Grid.Row className="settings__row settings__row--1">
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor="symbol">
                      Pair:
                      <Grid>
                        <Grid.Row columns={1}>
                          <Grid.Column>
                            <Dropdown
                              id="symbol"
                              name="symbol"
                              placeholder="Insert pair"
                              search
                              selection
                              options={showPair()}
                              value={values.symbol}
                              onChange={(_, { name, value }) => {
                                const symbolString = `${value}`;
                                setFieldValue(name, value);
                                setSelectedSymbol(symbolString);
                              }}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </label>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="settings__row settings__row--2">
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor="priceStep">
                      Price step:
                      <Grid stackable>
                        <Grid.Row columns={1}>
                          <Grid.Column>
                            <Field
                              id="priceStep"
                              name="priceStep"
                              placeholder="Insert price step"
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </label>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="settings__row settings__row--3">
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor="sizeStep">
                      Order size step %:
                      <Field id="sizeStep" name="sizeStep" placeholder="Insert size step" />
                    </label>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="settings__row settings__row--4">
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor="price">
                      Start price:
                      <Grid>
                        <Grid.Row columns={2}>
                          <Grid.Column width={16}>
                            <Field
                              id="price"
                              name="price"
                              placeholder="Insert price"
                              value={useCurrentPrice ? selectedSymbolPrice : values.price}
                              onChange={(e: any): void => {
                                setFieldValue(e.target.name, e.target.value);
                              }}
                            />
                          </Grid.Column>
                          <Grid.Column width={10}>
                            <Checkbox
                              label="Use current price ?"
                              toggle
                              onChange={() => {
                                setUseCurrentPrice(!useCurrentPrice);
                              }}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </label>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="settings__row settings__row--5">
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor="limit">
                      Invest limit:
                      <Field id="limit" name="limit" placeholder="Insert limit" />
                    </label>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="settings__row settings__row--6">
                {selectedSymbolPrice ? (
                  <>
                    <p>Current Price: {selectedSymbolPrice}</p>
                  </>
                ) : null}
              </Grid.Row>
              <Grid.Row className="settings__row settings__row--7">
                <Grid columns={2}>
                  <Grid.Column>
                    <Button type="submit" onClick={() => handleSubmit()}>
                      Create Orders
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      onClick={() => {
                        getPrice();
                      }}
                    >
                      Get Price
                    </Button>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};
