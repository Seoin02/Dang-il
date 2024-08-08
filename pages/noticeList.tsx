import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import noticeAPI, { GetNoticeListData } from '@/shared/@common/api/noticeAPI';
import useFetch from '@/shared/@common/api/hooks/useFetch';
import Loading from '@/shared/@common/ui/Loading';
const CustomNotice = dynamic(
  () => import('@/features/NoticeList/CustomNotice'),
);
const AllNotice = dynamic(() => import('@/features/NoticeList/AllNotice'));
const NavigationBar = dynamic(
  () => import('@/shared/@common/ui/Nav/NavigationBar'),
);
const Footer = dynamic(() => import('@/shared/@common/ui/Footer/Footer'));

const NoticeList = ({
  initialNotices,
}: {
  initialNotices: GetNoticeListData;
}) => {
  const [notices, setNotices] = useState(initialNotices);

  const { data, loading } = useFetch(() => {
    return noticeAPI.getNoticeList({});
  });

  useEffect(() => {
    if (!initialNotices && data) {
      setNotices(data);
    }
  }, [initialNotices, data]);

  return (
    <>
      <NavigationBar />
      <CustomNotice />
      <AllNotice />
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await noticeAPI.getNoticeList({});
    const initialNotices = response.data;
    return {
      props: {
        initialNotices,
      },
    };
  } catch (error) {
    return {
      props: {
        initialNotices: null,
      },
    };
  }
};

export default NoticeList;
