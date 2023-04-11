import * as Yup from 'yup';
import { useMediaRules } from 'hooks/MediaRules';
import { Formik, ErrorMessage } from 'formik';
import { getColor } from 'utils/formikColors';
import sprite from '../../../images/sprite.svg';
import { HiOutlineMail } from 'react-icons/hi';

import {
  FooterWrap,
  FooterWrapText,
  FooterWrapInput,
  InputFlag,
  FooterWrapBtn,
} from './FooterForm.styled';

const LoginSchema = Yup.object().shape({
  email: Yup.mixed().test({
    name: 'email',
    params: { a: 'test', b: 'qwe' },
    test: value => {
      return /\w+@\w+\.\w{1,5}/.test(value);
    },
  }),
});

export const FooterForm = () => {
  const { isDesktop } = useMediaRules();

  const getDisabledBtn = (errors, value) => {
    return !value || errors ? true : false;
  };

  return (
    <>
      <Formik
        initialValues={{ email: `` }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {}}
      >
        {props => (
          <FooterWrap onSubmit={props.handleSubmit}>
            {isDesktop && (
              <FooterWrapText>
                <h4>Subscribe to our Newsletter</h4>
                <p>
                  Subscribe up to our newsletter. Be in touch with latest news
                  and special offers, etc.
                </p>
              </FooterWrapText>
            )}
            <div style={{ position: 'relative' }}>
              <FooterWrapInput
                type="email"
                placeholder="Enter your email address"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.email}
                name="email"
                color={getColor(
                  props.errors.email,
                  props.values.email,
                  'rgba(255, 255, 255, 0.8)'
                )}
                borderColor={getColor(
                  props.errors.email,
                  props.values.email,
                  'rgba(255, 255, 255, 0.3)'
                )}
              />

              <HiOutlineMail
                className="Envelope"
                fill={getColor(
                  props.errors.email,
                  props.values.email,
                  'rgba(255, 255, 255, 0.8)'
                )}
              ></HiOutlineMail>
            </div>

            {props.values.email && (
              <div style={{ postioin: 'relative' }}>
                <InputFlag>
                  <svg>
                    <use
                      href={`${sprite}${getColor(
                        props.errors.email,
                        props.values.email,
                        'rgba(255, 255, 255, 0.8)'
                      )}`}
                    ></use>
                  </svg>
                </InputFlag>
              </div>
            )}

            {props.errors.email && props.values.email && (
              <ErrorMessage className="error" name="email" component="div" />
            )}
            <FooterWrapBtn
              type="submit"
              disabled={getDisabledBtn(props.errors.email, props.values.email)}
            >
              Subcribe
            </FooterWrapBtn>
          </FooterWrap>
        )}
      </Formik>
    </>
  );
};
