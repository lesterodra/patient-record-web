import { useAppSelector } from "@/redux/store";
import { patientRecordSearchParameterMapper } from "@/utils/constants";

const parseSearchFilterParameter = (
  parameters: any,
  fieldMapper: { label: string; field: string }[]
): { label: string; value: string }[] => {
  return fieldMapper
    .filter((mapper) => parameters[mapper.field])
    .map((mapper) => ({
      label: mapper.label,
      value: parameters[mapper.field],
    }));
};

const SearchFilterDisplay = () => {
  const { patientRecordListSearchParameters } = useAppSelector(
    (state) => state.recordReducer.value
  );

  const currentFilter = parseSearchFilterParameter(
    patientRecordListSearchParameters,
    patientRecordSearchParameterMapper
  );

  return (
    <div>
      <div className="flex gap-x-2 flex-wrap">
        <p>Filter by:</p>
        {currentFilter.length > 0
          ? currentFilter.map((filter, index) => (
              <div className="flex gap-1" key={`filter-${index}`}>
                <p className="font-bold">{filter.label}:</p>
                <p>{filter.value}</p>
              </div>
            ))
          : "None"}
      </div>
    </div>
  );
};

export default SearchFilterDisplay;
