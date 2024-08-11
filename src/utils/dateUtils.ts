///dateUtils.ts
export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'No date available';

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB').format(date);
};
