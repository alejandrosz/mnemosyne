
export function nestByMuseum(pieces) {
  const tree = { name: "search", value: "", children: [] };
  const museums = ["MET", "RMA", "MOMA"];
  museums.forEach(m => {
    const museumPieces = pieces.filter(p => p.museum === m);
    const bestImg = museumPieces[0] && museumPieces[0].imageUrl;
    const bestRating = museumPieces[0] && museumPieces[0].rating;
    const nestedMuseum = museumPieces.length ? nestByDate(museumPieces) : [];
    const childMuseum = {
      name: m,
      value: bestImg,

      children: nestedMuseum,
      size: bestRating, 
    };
    if (nestedMuseum.length) {
      tree.children.push(childMuseum);
    }

  });
  return tree;
}

export function nestByDate(museumPieces) {
  const mainDates = getDatesFromPieces(museumPieces);
  const nestedMuseum = [];
  mainDates.forEach((d, i) => {
    const datePieces = museumPieces.filter(p => {
      if (d === "noDate") {
        return !Number.isInteger(p.year);
      }
      return (
        p.year >= d && (mainDates[i + 1] ? p.year < mainDates[i + 1] : true)
      );
    });
    const bestImg = datePieces[0] && datePieces[0].imageUrl;
    const bestRating = datePieces[0] && datePieces[0].rating;
    const nestedDates = datePieces.length > 0 ? nestByOrigin(datePieces) : [];
    const childDate = {
      name: d,
      value: bestImg,
      children: nestedDates,
      size: bestRating, 
    };
    if (nestedDates.length) {
      nestedMuseum.push(childDate);
    }
  });
  return nestedMuseum;
}
export function getDatesFromPieces(museumPieces) {
  const allYears = museumPieces.map(p => Math.abs(p.year));
  const piecesWithDate = allYears
    .filter(y => Number.isInteger(y))
    .sort((a, b) => a - b);
  const piecesWithNoDate = allYears.filter(y => !Number.isInteger(y));
  const number = 4;
  const years = [];
  if (piecesWithDate.length >= number) {
    const step = Math.floor(piecesWithDate.length / (number - 1));
    for (let i = 0; i < piecesWithDate.length; i += step) {
      if (piecesWithDate[i]) {
        years.push(piecesWithDate[i]);
      }
    }
    years.push(piecesWithDate[piecesWithDate.length - 1]);
  } else {
    years.push(...piecesWithDate);
  }
  if (piecesWithNoDate.length) {
    years.push("noDate");
  }
  const uYears = [...new Set(years)];
  return uYears;
}
export function nestByOrigin(datePieces) {
  const origins = ["noOrigin"];
  const nestedDates = [];
  datePieces.forEach(p => {
    if (p.origin.length) {
      const newOrigin = p.origin[0];
      if (!origins.includes(newOrigin)) {
        origins.push(newOrigin);
      }
      origins.sort();
    }
  });
  origins.forEach((o, i) => {
    const originPieces = datePieces.filter(p => {
      if (p.origin.length <= 0 && o === "noOrigin") {
        return true;
      }
      return p.origin[0] === o;
    });

    const bestImg = originPieces[0] && originPieces[0].imageUrl;
    const bestRating = originPieces[0] && originPieces[0].rating;

    const nestedOrigins = originPieces.length ? nestByAuthor(originPieces) : [];
    const childDate = {
      name: o,
      value: bestImg,
      children: nestedOrigins || [],
      size: bestRating, 
    };
    if (nestedOrigins.length > 0) {
      nestedDates.push(childDate);
    }
  });
  return nestedDates;
}
export function nestByAuthor(originPieces) {
  const authors = [];
  const nestedDates = [];
  originPieces.forEach(p => {
    if (p.author && !authors.includes(p.author)) {
      authors.push(p.author);
    }
  });
  authors.forEach((a, i) => {
    const authorPieces = originPieces
      .filter(p => p.author === a)
      .map(p => {
        p.value = p.imageUrl;
        p.size = p.rating * 0.1;
        return p;
      });
    const bestImg = authorPieces[0] && authorPieces[0].imageUrl;
    const bestRating = authorPieces[0] && authorPieces[0].rating;
    const childDate = {
      name: a,
      value: bestImg,
      children: authorPieces || [],
      size: bestRating, //  authorPieces.length
    };
    if (authorPieces.length > 0) {
      nestedDates.push(childDate);
    }
  });
  return nestedDates;
}

export default { nestByMuseum };
