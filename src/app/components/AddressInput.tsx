import { AppDispatch } from "@/redux/store";
import phProvinceCityBarangay from "@/utils/phProvinceCityBarangay";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormDropdown from "./FormDropdown";
import { FormState, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ERROR_MESSAGE } from "@/utils/constants";

type AddressInputProps = {
  formRegister: UseFormRegister<any>;
  formState: FormState<any>;
  formSetValue: UseFormSetValue<any>;
};

const AddressInput = (props: AddressInputProps) => {
  const {
    formRegister,
    formSetValue,
    formState: { errors },
  } = props;
  const [cityMunicipalityList, setCityMunicipalityList] = useState<any[]>([]);
  const [barangayList, setBarangayList] = useState<any[]>([]);
  const list: { [key: string]: any } = phProvinceCityBarangay;

  const provinces: any[] = [];
  Object.keys(phProvinceCityBarangay).forEach((key) => {
    const regionProvinces = Object.keys(list[key].province_list).map(
      (provinceKey) => ({
        name: provinceKey,
        municipalities: Object.keys(
          list[key].province_list[provinceKey].municipality_list
        ).map((municipalityKey) => ({
          name: municipalityKey,
          barangayList:
            list[key].province_list[provinceKey].municipality_list[
              municipalityKey
            ].barangay_list,
        })),
      })
    );
    provinces.push(...regionProvinces);
  });

  const onSelectedProvinceChange = (e: any) => {
    formSetValue("province", e.target.value, { shouldValidate: true });
    setCityMunicipalityList(
      e.target.value
        ? provinces.find((province) => province.name === e.target.value)
            .municipalities
        : []
    );
    setBarangayList([]);
  };

  const onSelectedMunicipalityChange = (e: any) => {
    formSetValue("municipality", e.target.value, { shouldValidate: true });
    setBarangayList(
      e.target.value
        ? cityMunicipalityList.find(
            (cityMunicipality) => cityMunicipality.name === e.target.value
          ).barangayList
        : []
    );
  };

  provinces.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex gap-x-10 gap-y-3 flex-wrap">
      <div>
        <p>Address line 1</p>
        <input
          type="text"
          className="rounded"
          {...formRegister("address", {})}
        />
      </div>
      <FormDropdown
        label="Province"
        width="w-60"
        onChange={onSelectedProvinceChange}
        options={provinces.map((province) => province.name)}
        formRegister={formRegister("province", {
          required: ERROR_MESSAGE.REQUIRED,
        })}
        errorMessage={errors?.province?.message?.toString()}
      />
      <FormDropdown
        label="City/Municipality"
        width="w-60"
        onChange={onSelectedMunicipalityChange}
        options={cityMunicipalityList.map((municipality) => municipality.name)}
        formRegister={formRegister("municipality", {
          required: ERROR_MESSAGE.REQUIRED,
        })}
        errorMessage={errors?.municipality?.message?.toString()}
      />
      <FormDropdown
        label="Barangay"
        width="w-60"
        options={barangayList.map((barangay) => barangay)}
        formRegister={formRegister("barangay", {
          required: ERROR_MESSAGE.REQUIRED,
        })}
        errorMessage={errors?.barangay?.message?.toString()}
      />
    </div>
  );
};

export default React.memo(AddressInput);
