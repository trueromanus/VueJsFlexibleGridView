export default {
    methods: {
        pageFormatter(pageNumber, metadata) {
            const pageSize = metadata.pageSize;
      
            switch(pageNumber)  {
              case `<<`:
              case `first`:
                return 1;
              case `<`:
              case `previous`:
                return this.currentPage - 1;
              case `>`:
              case `next`:
                return this.currentPage + 1;
              case `>>`:
              case `last`:
                return Math.ceil(metadata.totalCount / pageSize);
              default:
                return pageNumber;
           }
        },
        getPaginationPages({ pageNumber, metadata }) {
            const count = metadata.totalCount;
            if (count === 0) {
              this.paginationPages = [];
              return;
            }

            const pageSize = metadata.pageSize;
            const countPages = Math.ceil(count / pageSize);
            this.currentPage = pageNumber;

            const paginationPages = [];
            const pagesBufferSize = 2;

            if (countPages <= pagesBufferSize * 2 + 1) {
                for (let i = 1; i <= countPages; i++) paginationPages.push(i);
            } else {
                let startPage = this.currentPage - pagesBufferSize;
                if (startPage < 1) startPage = 1;

                if (startPage > 1) {
                paginationPages.push(`<<`);
                paginationPages.push(`<`);
                }

                for (let i = 0; i < pagesBufferSize * 2 + 1; i++) {
                if (startPage + i > countPages) break;
                paginationPages.push(startPage + i);
                }
                
                if (startPage + pagesBufferSize + 1 < countPages - 1) {
                paginationPages.push(`>`);
                paginationPages.push(`>>`);
                }
            }
            this.paginationPages = paginationPages;
        }
    }
}