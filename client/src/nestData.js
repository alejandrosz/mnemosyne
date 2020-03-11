// export function filterResults(results) {
//   const limit = 100;
//   let filterResults = sortByRating(results).filter(p => !!p.imageUrl);
//   if (results.length > limit) {
//     filterResults = results.slice(0, limit + 1);
//   }
//   return filterResults;
// }
// export function sortByRating(pieces) {
//   const ratedPieces = pieces.sort((a, b) => b.rating - a.rating);
//   return ratedPieces;
// }
export function nestByMuseum(pieces) {
  const tree = { name: 'search', value: '', children: [] };
  const museums = ['MET', 'MOMA', 'RMA'];
  museums.forEach(m => {
    const museumPieces = pieces.filter(p => p.museum === m);
    const bestImg = museumPieces[0] && museumPieces[0].imageUrl;
    const nestedMuseum = museumPieces.length ? nestByDate(museumPieces) : [];
    // console.log('nestByMuseum', nestedMuseum);
    const childMuseum = {
      name: m,
      value: bestImg,
      children: nestedMuseum,
      size: museumPieces.length
    };
    if (nestedMuseum.length) {
      tree.children.push(childMuseum);
    }
    // nodeLentgh +=1
    // setState({ tree });
  });
  console.log('tree', tree);
  return tree;
}

export function nestByDate(museumPieces) {
  const mainDates = getDatesFromPieces(museumPieces);
  console.log('mainDates', mainDates);
  const nestedMuseum = [];
  mainDates.forEach((d, i) => {
    const datePieces = museumPieces.filter(p => {
      if (d === 'noDate') {
        return !Number.isInteger(p.year);
      }
      return p.year >= d && (mainDates[i + 1] ? p.year < mainDates[i + 1] : true);
    });
    const bestImg = datePieces[0] && datePieces[0].imageUrl;
    const nestedDates = datePieces.length > 0 ? nestByOrigin(datePieces) : [];
    // console.log('nestedDates', nestedDates);
    const childDate = {
      name: d,
      value: bestImg,
      children: nestedDates,
      size: datePieces.length
    };
    if (nestedDates.length) {
      nestedMuseum.push(childDate);
    }
  });
  return nestedMuseum;
}
export function getDatesFromPieces(museumPieces) {
  const allYears = museumPieces.map(p => Math.abs(p.year));
  const piecesWithDate = allYears.filter(y => Number.isInteger(y)).sort((a, b) => a - b);
  const piecesWithNoDate = allYears.filter(y => !Number.isInteger(y));
  // console.log('allYears', allYears);
  // console.log('piecesWithDate', piecesWithDate, piecesWithNoDate);
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
    years.push('noDate');
  }
  const uYears = [...new Set(years)];
  // console.log("years", years);
  return uYears;
}
export function nestByOrigin(datePieces) {
  const origins = ['noOrigin'];
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
  // console.log('--- origins', origins);
  // console.log("nestByOrigin All", datePieces.length);
  origins.forEach((o, i) => {
    const prevOrigins = i > 0 ? origins.slice(0, i) : [];
    const originPieces = datePieces.filter(p => {
      if (p.origin.length <= 0 && o === 'noOrigin') {
        return true;
      }
      return (
        p.origin[0] ===
        o /* &&
        !p.origin.reduce((ac, or) => ac || prevOrigins.includes[or]) */
        /* return p.origin.includes(
        o
      ) */
      );
    });
    /* console.log('-- currOrigin', o, 'prevOrigins', prevOrigins, 'filtered', [
      ...originPieces.map(p => p.origin)
    ]); */
    const bestImg = originPieces[0] && originPieces[0].imageUrl;
    const nestedOrigins = originPieces.length ?  nestByAuthor(originPieces)  : [];
    // console.log("nestByOrigin", nestedOrigins.length, o);
    const childDate = {
      name: o,
      value: bestImg,
      children: nestedOrigins || [],
      size: originPieces.length
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
        // p.size = 1;
        return p;
      });
    // console.log('nestByAuthor', authorPieces);
    const bestImg = authorPieces[0] && authorPieces[0].imageUrl;
    const childDate = {
      name: a,
      value: bestImg,
      children: authorPieces || [],
      size: authorPieces.length
    };
    if (authorPieces.length > 0) {
      nestedDates.push(childDate);
    }
  });
  return nestedDates;
}

export default { nestByMuseum };
