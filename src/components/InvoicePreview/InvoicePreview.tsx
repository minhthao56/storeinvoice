import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { BoxShadow, Pagination } from "..";
import "./InvoicePreview.scss";

export const InvoicePreview: React.FC<IInvoicePreview> = ({ link }) => {
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);

  function onDocumentLoadSuccess(data: { numPages: any }) {
    setNumPages(data.numPages);
  }
  return (
    <div className="invoice-preview">
      <BoxShadow className="invoice-preview__container">
        <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={page} />
        </Document>
        {numPages !== 1 && (
          <Pagination
            page={page}
            totalPage={numPages}
            handleSelectNumber={(pageInside) => setPage(pageInside)}
            onBack={() => {
              if (page > 0) {
                setPage((page) => page - 1);
              }
            }}
            onNext={() => {
              if (page < numPages) {
                setPage((page) => page + 1);
              }
            }}
          />
        )}
      </BoxShadow>
    </div>
  );
};
