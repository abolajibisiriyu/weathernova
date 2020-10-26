const createActionType = (type: string) => ({
  default: type.toUpperCase(),
  pending: `${type}_PENDING`.toUpperCase(),
  fulfilled: `${type}_FULFILLED`.toUpperCase(),
  rejected: `${type}_REJECTED`.toUpperCase()
});

export default createActionType;
