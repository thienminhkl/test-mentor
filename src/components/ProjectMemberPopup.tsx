import { Avatar, Stack } from '@mui/material';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import {
  bindHover,
  bindPopover,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import { Member } from '~/type/projects.type';
import ProjectMemberTable from './ProjectMemberTable';
//-------------------------------------------------------------------------------

type Props = {
  members: Member[];
  projId: string | number;
};

function ProjectMemberPopup({ members, projId }: Props) {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  return (
    <Stack direction="row" spacing={0.2} {...bindHover(popupState)}>
      {members.map((mem) => (
        <Avatar
          key={mem.userId}
          sx={{ width: 30, height: 30 }}
          src={mem.avatar}
        />
      ))}

      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ProjectMemberTable members={members} projId={projId} />
      </HoverPopover>
    </Stack>
  );
}

export default ProjectMemberPopup;
