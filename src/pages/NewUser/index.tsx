import { useFormik } from "formik";
import { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import ConfirmationModal from "~/components/ModalConfirmation";
import TextField from "~/components/TextField";
import { useRegistrationContext } from "~/contexts/ContextRegistre";
import routes from "~/router/routes";
import { RegistrationStatus } from "~/types/registration";
import { cpfMask, validateCpfChange } from "~/utils/utilsCpf";
import { removeNonNumeric } from "~/utils/utilsText";
import { showToast } from "~/utils/utilsToast";

import * as S from "./styles";

const NewUserPage = () => {
  const history = useHistory();
  const { addRegistration } = useRegistrationContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cpf: "",
      admissionDate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /[a-zA-Z].*[a-zA-Z]/,
          "O nome deve conter pelo menos duas letras.",
        )
        .matches(/\s/, "O nome deve conter pelo menos um espaço.")
        .matches(/^\D/, "O nome não pode começar com um número.")
        .required("Nome é obrigatório"),
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      cpf: Yup.string()
        .test(
          "isValidCpf",
          "CPF inválido",
          (value) => validateCpfChange(value ?? "").error === "",
        )
        .required("CPF é obrigatório"),
      admissionDate: Yup.date().required("Data de admissão é obrigatória"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const response = await addRegistration({
        employeeName: values.name,
        email: values.email,
        cpf: removeNonNumeric(values.cpf),
        admissionDate: values.admissionDate,
        status: RegistrationStatus.REVIEW,
      });
      showToast(response);
      setSubmitting(false);
      resetForm();
      history.push(routes.dashboard);
    },
  });

  const handleOpenModal = async () => {
    const errors = await formik.validateForm();
    if (!Object.keys(errors).length) {
      setIsModalOpen(true);
    } else {
      formik.setTouched({
        name: true,
        email: true,
        cpf: true,
        admissionDate: true,
      });
    }
  };

  const handleConfirmSubmit = () => {
    setIsModalOpen(false);
    formik.handleSubmit();
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOpenModal();
          }}
        >
          <TextField
            placeholder="Nome"
            label="Nome"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <TextField
            placeholder="CPF"
            mask={cpfMask}
            name="cpf"
            label="CPF"
            value={formik.values.cpf}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.cpf && formik.errors.cpf ? formik.errors.cpf : ""
            }
          />
          <TextField
            label="Data de admissão"
            type="date"
            name="admissionDate"
            value={formik.values.admissionDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.admissionDate && formik.errors.admissionDate
                ? formik.errors.admissionDate
                : ""
            }
          />
          <Button type="submit" disabled={formik.isSubmitting}>
            Cadastrar
          </Button>
        </form>
      </S.Card>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title="Confirmar Cadastro"
        text={`Tem certeza que deseja cadastrar ${formik.values.name}?`}
        onConfirm={handleConfirmSubmit}
      />
    </S.Container>
  );
};

export default NewUserPage;
