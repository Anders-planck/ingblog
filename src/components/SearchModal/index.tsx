import { Autocomplete, Modal, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { closeSearchModal, selectOpened, setSearch } from '@/store/app/search';
import { supabase } from '@/lib/supabase';

const SearchModal = () => {
  const [autoCompleteData, setautoCompleteData] = useState<string[]>([]);
  const opened = useAppSelector(selectOpened);
  const dispatch = useAppDispatch();
  const [searchContent, setSearchContent] = useState('');

  const handleClose = () => {
    dispatch(closeSearchModal());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setSearch(searchContent));
      handleClose();
    }
  };

  useEffect(() => {
    if (searchContent) {
      const fetchAutoCompleteData = async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('title')
          .ilike('title', `%${searchContent}%`);

        if (error) {
          return;
        }

        if (data) {
          setautoCompleteData(data.map((post) => post.title));
        }
      };
      fetchAutoCompleteData();
    }
  }, [searchContent]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        transitionProps={{ transition: 'rotate-left' }}
      >
        <Autocomplete
          placeholder="Search"
          onKeyDown={(event) => handleKeyDown(event)}
          onChange={(value) => setSearchContent(value)}
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          data={autoCompleteData}
        />
      </Modal>
    </>
  );
};

export default SearchModal;
